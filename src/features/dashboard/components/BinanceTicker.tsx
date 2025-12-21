import { FaBoltLightning } from "react-icons/fa6";
import TickerCard from "./TickerCard";
import { useExchangeRates } from "@/features/exchange-rates";

export const BinanceTicker = () => {
  const { ratesMap, isLoading } = useExchangeRates();

  const BINANCE_RATES = {
    BUY: ratesMap["Binance-USDT_BUY"]?.value,
    SELL: ratesMap["Binance-USDT_SELL"]?.value,
  };

  return (
    <TickerCard
      label="Binance P2P"
      icon={<FaBoltLightning className="h-4 w-4" />}
      loading={isLoading}
    >
      <data className="text-sm font-bold text-yellow-500">
        BUY: {BINANCE_RATES.BUY.toFixed(2)}
      </data>
      <data className="text-xs text-slate-400">
        SELL: {BINANCE_RATES.SELL.toFixed(2)}
      </data>
    </TickerCard>
  );
};
