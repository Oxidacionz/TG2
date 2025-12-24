import { RealtimeChannel } from "@supabase/supabase-js";

import supabaseClient from "@/lib/supabaseClient";

import { ExchangeRateService } from "../services/exchangeRates.service";
import { ExchangeRate, ExchangeRateKey } from "../types";

interface ExchangeRatesState {
  rates: Partial<Record<ExchangeRateKey, ExchangeRate>>;
  isLoading: boolean;
  error: string | null;
}

type Listener = () => void;

class ExchangeRatesStore {
  private static instance: ExchangeRatesStore;

  private state: ExchangeRatesState = {
    rates: {},
    isLoading: false,
    error: null,
  };

  private listeners: Set<Listener> = new Set();
  private subscription: RealtimeChannel | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): ExchangeRatesStore {
    if (!ExchangeRatesStore.instance) {
      ExchangeRatesStore.instance = new ExchangeRatesStore();
    }
    return ExchangeRatesStore.instance;
  }

  public subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot = (): ExchangeRatesState => {
    return this.state;
  };

  public async init() {
    if (this.isInitialized) return;

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        this.updateState({ isLoading: true, error: null });

        await this.refreshRates();

        this.setupRealtimeSubscription();

        this.isInitialized = true;
      } catch (error) {
        console.error("Failed to initialize ExchangeRatesStore:", error);
        this.updateState({
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }

  private async refreshRates() {
    try {
      const initialRates = await ExchangeRateService.getInitialRates();
      const ratesMap: Partial<Record<ExchangeRateKey, ExchangeRate>> = {};
      initialRates.forEach((r) => {
        const key = this.generateKey(r.source, r.symbol);
        ratesMap[key] = r;
      });
      this.updateState({ rates: ratesMap, isLoading: false });
    } catch (error) {
      console.error("Failed to refresh rates:", error);
    }
  }

  private generateKey(source: string, symbol: string): ExchangeRateKey {
    return `${source}-${symbol}` as ExchangeRateKey;
  }

  private setupRealtimeSubscription() {
    if (this.subscription) return;

    this.subscription = supabaseClient
      .channel("public:current_rates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "current_rates",
        },
        (payload) => {
          this.handleRealtimeEvent(
            payload as unknown as {
              eventType: "INSERT" | "UPDATE" | "DELETE";
              new: ExchangeRate;
              old: ExchangeRate;
            },
          );
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          this.refreshRates();
        } else if (status === "CLOSED") {
          console.warn(
            "Realtime connection closed. Attempting to reconnect...",
          );
        } else if (status === "CHANNEL_ERROR") {
          console.error("Realtime channel error. Connection may be unstable.");
        }
      });
  }

  private handleRealtimeEvent(payload: {
    eventType: "INSERT" | "UPDATE" | "DELETE";
    new: ExchangeRate;
    old: ExchangeRate;
  }) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    const currentRates = { ...this.state.rates };

    if (eventType === "INSERT" || eventType === "UPDATE") {
      const rate = newRecord;
      const key = this.generateKey(rate.source, rate.symbol);
      currentRates[key] = rate;
    } else if (eventType === "DELETE") {
      const rate = oldRecord;
      const key = this.generateKey(rate.source, rate.symbol);
      delete currentRates[key];
    }

    this.updateState({ rates: currentRates });
  }

  private updateState(partialState: Partial<ExchangeRatesState>) {
    this.state = { ...this.state, ...partialState };
    this.emitChange();
  }

  private emitChange() {
    this.listeners.forEach((listener) => listener());
  }

  public cleanup() {
    if (this.subscription) {
      supabaseClient.removeChannel(this.subscription);
      this.subscription = null;
    }
    this.isInitialized = false;
    this.initPromise = null;
    this.state = {
      rates: {},
      isLoading: false,
      error: null,
    };
    this.emitChange();
  }

  public async updateInternalRate(value: number) {
    try {
      this.updateState({ isLoading: true });
      await ExchangeRateService.updateInternalRate(value);
    } catch (error) {
      this.updateState({
        error: error instanceof Error ? error.message : "Failed to update rate",
      });
      throw error;
    } finally {
      this.updateState({ isLoading: false });
    }
  }
}

export const exchangeRatesStore = ExchangeRatesStore.getInstance();
