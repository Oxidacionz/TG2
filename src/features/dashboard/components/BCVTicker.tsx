import { GrTransaction } from "react-icons/gr";

import { useExchangeRates } from "@/features/exchange-rates";

import TickerCard from "./TickerCard";

export const BCVTicker = () => {
  const { ratesMap, isLoading } = useExchangeRates();

  const BCV_RATES = {
    USD: ratesMap["BCV-USD"]?.value.toFixed(2),
    EUR: ratesMap["BCV-EUR"]?.value.toFixed(2),
  };

  return (
    <TickerCard
      label="BCV Oficial"
      icon={<GrTransaction className="h-4 w-4" />}
      loading={isLoading}
    >
      <data className="text-sm font-bold text-white">$ {BCV_RATES.USD}</data>
      <data className="text-xs text-slate-400">€ {BCV_RATES.EUR}</data>
    </TickerCard>
  );
};
