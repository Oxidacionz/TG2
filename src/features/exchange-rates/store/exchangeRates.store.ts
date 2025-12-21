import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { ExchangeRate, ExchangeRateKey } from "../types";
import { ExchangeRateService } from "../services/exchangeRates.service";

interface ExchangeRatesState {
  rates: Partial<Record<ExchangeRateKey, ExchangeRate>>; // Key format: "SOURCE-SYMBOL"
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

  /**
   * Subscribe to store changes. Compatible with useSyncExternalStore.
   */
  public subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /**
   * Get current state snapshot.
   */
  public getSnapshot = (): ExchangeRatesState => {
    return this.state;
  };

  /**
   * Initialize the store: fetch initial data and set up realtime subscription.
   * idempotent and race-condition free.
   */
  public async init() {
    if (this.isInitialized) return;

    // If initialization is already in progress, wait for it
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        this.updateState({ isLoading: true, error: null });

        // 1. Initial Fetch
        await this.refreshRates();

        // 2. Setup Realtime Subscription (current_rates ONLY)
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
      // We don't set global error here to avoid blocking UI on background refreshes
    }
  }

  private generateKey(source: string, symbol: string): ExchangeRateKey {
    return `${source}-${symbol}` as ExchangeRateKey;
  }

  /**
   * Set up Supabase Realtime subscription for current_rates table
   */
  private setupRealtimeSubscription() {
    if (this.subscription) return;

    // We only subscribe to public:current_rates.
    // RLS ensures we only receive events we are allowed to see.
    this.subscription = supabase
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
        // AUTO-HEALING LOGIC
        if (status === "SUBSCRIBED") {
          // Connection established (or re-established).
          // We fetch latest rates to ensure we didn't miss events while disconnected.
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

  /**
   * Cleanup subscription. Useful for testing or full app unmounts.
   */
  public cleanup() {
    if (this.subscription) {
      supabase.removeChannel(this.subscription);
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
  /**
   * Updates the internal exchange rate manually.
   * This is an optimistic action - the store will update via Realtime subscription.
   */
  public async updateInternalRate(value: number) {
    try {
      this.updateState({ isLoading: true });
      await ExchangeRateService.updateInternalRate(value);
      // We don't manually update state.rates here.
      // We rely on the Realtime 'UPDATE' event to ensure source-of-truth consistency.
    } catch (error) {
      this.updateState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to update rate",
      });
      throw error;
    }
  }
}

export const exchangeRatesStore = ExchangeRatesStore.getInstance();
