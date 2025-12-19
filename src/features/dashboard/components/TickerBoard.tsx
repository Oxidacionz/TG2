import { MdRefresh } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaBoltLightning } from "react-icons/fa6";
import { TickerCard } from "./TickerCard";
import { useExchangeRates } from "@features/exchange-rates/hooks/useExchangeRates";
import { RATES_CONFIG } from "@core/config/constants";

/**
 * Componente Smart para BCV
 * Responsabilidad: Obtener y formatear datos del BCV
 */
const BCVTicker = () => {
  const { rates, loading, refetch } = useExchangeRates("bcv", {
    scheduledRefresh: {
      time: RATES_CONFIG.BCV.SCHEDULED_TIME,
      timezoneOffset: RATES_CONFIG.BCV.TIMEZONE_OFFSET,
    },
  });

  return (
    <TickerCard
      label="BCV Oficial"
      icon={<GrTransaction className="h-4 w-4" />}
      actionIcon={<MdRefresh className="h-4 w-4" />}
      onAction={refetch}
      loading={loading}
    >
      <data className="text-sm font-bold text-white">
        $ {rates.usd ? rates.usd.toFixed(2) : "--"}
      </data>
      <data className="text-xs text-slate-400">
        € {rates.eur ? rates.eur.toFixed(2) : "--"}
      </data>
    </TickerCard>
  );
};

/**
 * Componente Smart para Binance
 * Responsabilidad: Obtener y formatear datos de Binance
 */
const BinanceTicker = () => {
  const { rates, loading, refetch } = useExchangeRates("binance", {
    pollingIntervalMs: RATES_CONFIG.BINANCE.REFRESH_INTERVAL_MS,
  });
  const rate = rates.usdt || 0;

  return (
    <TickerCard
      label="Binance P2P"
      icon={<FaBoltLightning className="h-4 w-4" />}
      actionIcon={<MdRefresh className="h-4 w-4" />}
      onAction={refetch}
      loading={loading}
    >
      <data className="text-sm font-bold text-yellow-500">
        USDT {rate ? rate.toFixed(2) : "--"}
      </data>
    </TickerCard>
  );
};

/**
 * Organismo TickerBoard
 * Responsabilidad: Layout y orquestación de los Tickers disponibles
 */
export const TickerBoard = () => {
  return (
    <section
      aria-label="Market Rates"
      className="flex flex-1 flex-col overflow-hidden bg-slate-800 text-white shadow-lg sm:flex-row"
    >
      <BCVTicker />
      <BinanceTicker />
    </section>
  );
};
