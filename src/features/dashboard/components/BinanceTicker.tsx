import { MdRefresh } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { TickerCard } from "./TickerCard";

/**
 * Componente Smart para Binance
 * Responsabilidad: Obtener y formatear datos de Binance
 */
export const BinanceTicker = () => {
  // Static values for now as per "Zero Client Logic" requirement
  const rate: number = 0;
  const loading = false;
  const refetch = async () => {};

  return (
    <TickerCard
      label="Binance P2P"
      icon={<FaBoltLightning className="h-4 w-4" />}
      actionIcon={<MdRefresh className="h-4 w-4" />}
      onAction={refetch}
      loading={loading}
    >
      <data className="text-sm font-bold text-yellow-500">
        {/* Placeholder estático */}
        USDT {rate > 0 ? rate.toFixed(2) : "--"}
      </data>
    </TickerCard>
  );
};
