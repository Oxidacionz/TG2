import { useSyncExternalStore, useEffect } from "react";
import { exchangeRatesStore } from "../store/exchangeRates.store";

export const useExchangeRates = () => {
  const state = useSyncExternalStore(
    exchangeRatesStore.subscribe,
    exchangeRatesStore.getSnapshot,
  );

  useEffect(() => {
    exchangeRatesStore.init();
  }, []);

  return {
    ratesMap: state.rates,
    rates: Object.values(state.rates),
    isLoading: state.isLoading,
    error: state.error,
  };
};
