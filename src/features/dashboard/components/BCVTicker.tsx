import { MdRefresh } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { TickerCard } from "./TickerCard";

export const BCVTicker = () => {
  const rates = { usd: 0, eur: 0 };
  const loading = false;
  const refetch = async () => {};

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
