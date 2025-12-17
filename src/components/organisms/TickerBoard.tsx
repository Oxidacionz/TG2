import { MdRefresh, MdModeEdit } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaBoltLightning, FaGlobe } from "react-icons/fa6";
import { ReactNode } from "react";

interface Props {
  bcvRate: { usd: number; eur: number } | null;
}

interface TickerItemProps {
  label: string;
  icon: ReactNode;
  actionIcon?: ReactNode;
  children: ReactNode;
}

const TickerItem = ({ label, icon, actionIcon, children }: TickerItemProps) => {
  return (
    <article className="bg-brand-900 flex w-full flex-col justify-center gap-1 p-4 md:justify-start">
      <header className="mb-1 flex min-w-max items-center gap-1 text-[10px] font-bold text-slate-500 uppercase">
        {icon}
        <span>{label}</span>
        {actionIcon && (
          <span className="ml-1 text-slate-600">{actionIcon}</span>
        )}
      </header>
      <div className="flex flex-col gap-0.5">{children}</div>
    </article>
  );
};

export const TickerBoard = (props: Props) => {
  const { bcvRate } = props;

  return (
    <section
      aria-label="Market Rates"
      className="grid grid-cols-1 overflow-hidden bg-slate-800 text-white shadow-lg min-[500px]:grid-cols-2 lg:grid-cols-4"
    >
      {/* BCV */}
      <TickerItem
        label="BCV Oficial"
        icon={<GrTransaction className="h-4 w-4" />}
        actionIcon={<MdRefresh className="h-4 w-4" />}
      >
        <data value={bcvRate?.usd} className="text-sm font-bold text-white">
          $ {bcvRate ? bcvRate.usd.toFixed(2) : "--"}
        </data>
        <data value={bcvRate?.eur} className="text-xs text-slate-400">
          € {bcvRate ? bcvRate.eur.toFixed(2) : "--"}
        </data>
      </TickerItem>

      {/* Binance */}
      <TickerItem
        label="Binance P2P"
        icon={<FaBoltLightning className="h-4 w-4" />}
        actionIcon={<MdRefresh className="h-4 w-4" />}
      >
        <data className="text-sm font-bold text-yellow-500">BUY 36.10</data>
        <data className="text-xs font-medium text-orange-400">SELL 35.90</data>
      </TickerItem>

      {/* Zelle */}
      <TickerItem
        label="Zelle"
        icon={<FaGlobe className="h-4 w-4" />}
        actionIcon={<MdModeEdit className="h-4 w-4" />}
      >
        <div className="overflow-hidden py-1 font-mono text-sm whitespace-nowrap text-green-400">
          36.00
        </div>
      </TickerItem>

      {/* Euro */}
      <TickerItem
        label="Euro (Intl)"
        icon={<FaGlobe className="h-4 w-4" />}
        actionIcon={<MdModeEdit className="h-4 w-4" />}
      >
        <data className="text-sm font-bold text-blue-400">€ 39.00</data>
      </TickerItem>
    </section>
  );
};
