import { useState, useEffect, useCallback } from "react";
import { exchangeRateService } from "../services/ExchangeRateService";
import { ExchangeRateData, ExchangeRateResponse } from "../types/finance";

export type ExchangeProviderType = "bcv" | "binance";

export interface ExchangeRatesResult {
  rates: Record<string, number>;
  loading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
}

interface UseExchangeRatesOptions {
  pollingIntervalMs?: number;
  scheduledRefresh?: {
    time: string; // Formato "HH:mm"
    timezoneOffset: number; // UTC Offset (ej: -4)
  };
}

/**
 * Calcula milisegundos hasta la próxima ocurrencia de una hora específica en una zona horaria.
 */
const getMsUntilNextTime = (
  timeStr: string,
  timezoneOffset: number,
): number => {
  const [hourStr, minuteStr] = timeStr.split(":");
  const targetHour = parseInt(hourStr, 10);
  const targetMinute = parseInt(minuteStr, 10);

  const now = new Date();
  // Convertir hora objetivo a UTC
  // Ej: 17:00 Venezuela (-4) -> 17 - (-4) = 21:00 UTC
  // Nota: Restar el offset. Si offset es -4, 17 - (-4) = 21. Correcto.
  const targetHourUtc = targetHour - timezoneOffset;

  // Normalizar si pasa de 24h o baja de 0 (aunque con -4 a +12 díficil que rompa simple, pero por seguridad)
  // Ej: 23:00 UTC+2 -> 21:00 UTC.
  // Ej: 01:00 UTC-5 -> 06:00 UTC.

  const targetDate = new Date(now);
  targetDate.setUTCHours(targetHourUtc, targetMinute, 0, 0);

  // Si la hora ya pasó hoy en UTC, programar para mañana
  if (targetDate.getTime() <= now.getTime()) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return targetDate.getTime() - now.getTime();
};

export const useExchangeRates = (
  provider: ExchangeProviderType,
  options?: UseExchangeRatesOptions,
): ExchangeRatesResult => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (provider === "bcv") {
        const [usdData, eurData] = await Promise.all([
          exchangeRateService.getExchangeRate("USD", "VES", "bcv"),
          exchangeRateService.getExchangeRate("EUR", "VES", "bcv"),
        ]);

        const getRateValue = (response: ExchangeRateResponse) => {
          if (Array.isArray(response.data)) {
            const item = response.data.find(
              (i: ExchangeRateData) => i.source === "BCV",
            );
            return item ? item.rate : 0;
          }
          return response.data?.rate || 0;
        };

        setRates({
          usd: getRateValue(usdData),
          eur: getRateValue(eurData),
        });
      } else if (provider === "binance") {
        const usdtData = await exchangeRateService.getExchangeRate(
          "USDT",
          "VES",
          "binance",
        );

        let rate = 0;
        if (Array.isArray(usdtData.data)) {
          rate = usdtData.data[0]?.rate || 0;
        } else {
          rate = usdtData.data?.rate || 0;
        }

        setRates({ usdt: rate });
      }
    } catch (err) {
      console.error(`Error fetching rates for ${provider}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [provider]);

  // Efecto para carga inicial
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  // Efecto para Polling (Intervalo)
  useEffect(() => {
    if (!options?.pollingIntervalMs) return;

    const intervalId = setInterval(() => {
      console.log(`[useExchangeRates] Auto-refreshing ${provider} (Polling)`);
      fetchRates();
    }, options.pollingIntervalMs);

    return () => clearInterval(intervalId);
  }, [fetchRates, options?.pollingIntervalMs, provider]);

  // Efecto para Actualización Programada (Horario fijo)
  useEffect(() => {
    if (!options?.scheduledRefresh) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextRefresh = () => {
      const { time, timezoneOffset } = options.scheduledRefresh!;
      const delay = getMsUntilNextTime(time, timezoneOffset);

      console.log(
        `[useExchangeRates] Next ${provider} refresh scheduled in ${(delay / 1000 / 60).toFixed(1)} minutes`,
      );

      timeoutId = setTimeout(() => {
        console.log(
          `[useExchangeRates] Auto-refreshing ${provider} (Scheduled)`,
        );
        fetchRates();
        // Reprogramar para el siguiente día
        scheduleNextRefresh();
      }, delay);
    };

    scheduleNextRefresh();

    return () => clearTimeout(timeoutId);
  }, [fetchRates, options?.scheduledRefresh, provider]);

  return { rates, loading, error, refetch: fetchRates };
};
