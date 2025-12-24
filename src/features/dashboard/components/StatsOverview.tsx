import { FaHandHoldingDollar, FaWallet } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";

import { StatCard } from "@core/display/StatCard";

interface Props {
  stats: {
    totalVolume: number;
    netProfit: number;
    totalCapital: number;
  };
}

export const StatsOverview = (props: Props) => {
  const { stats } = props;

  return (
    <section
      aria-label="Estadísticas Generales"
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      <StatCard
        title="Volumen Total"
        value={`$${stats.totalVolume.toLocaleString()}`}
        subtext="General"
        icon={<GrTransaction />}
        color="blue"
      />
      <StatCard
        title="Ganancia Neta"
        value={`$${stats.netProfit.toLocaleString()}`}
        subtext="Margen global"
        icon={<FaHandHoldingDollar className="h-4 w-4" />}
        color="green"
      />
      <StatCard
        title="Capital en Cuentas"
        value={`$${stats.totalCapital.toLocaleString()}`}
        subtext="Disponible Real"
        icon={<FaWallet />}
        color="yellow"
      />
    </section>
  );
};
