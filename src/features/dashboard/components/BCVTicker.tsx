import { GrTransaction } from "react-icons/gr";
import TickerCard from "./TickerCard";
import { useExchangeRates } from "@/features/exchange-rates";

export const BCVTicker = () => {
  const { ratesMap, isLoading } = useExchangeRates();

  const BCV_RATES = {
    USD: ratesMap["BCV-USD"]?.value,
    EUR: ratesMap["BCV-EUR"]?.value,
  };

  return (
    <TickerCard
      label="BCV Oficial"
      icon={<GrTransaction className="h-4 w-4" />}
      loading={isLoading}
    >
      <data className="text-sm font-bold text-white">
        $ {BCV_RATES.USD ? BCV_RATES.USD.toFixed(2) : "--"}
      </data>
      <data className="text-xs text-slate-400">
        € {BCV_RATES.EUR ? BCV_RATES.EUR.toFixed(2) : "--"}
      </data>
    </TickerCard>
  );
};
