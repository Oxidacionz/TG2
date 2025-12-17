import { MdRefresh, MdModeEdit } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaBoltLightning, FaGlobe } from "react-icons/fa6";

interface Props {
  bcvRate: { usd: number; eur: number } | null;
}

export const TickerBoard = (props: Props) => {
  const { bcvRate } = props;

  return (
    <div className="grid flex-1/3 grid-cols-1 grid-rows-4 items-center justify-around divide-y divide-slate-800 bg-[#0f172a] p-4 text-end text-white sm:grid-cols-4 sm:grid-rows-1 sm:divide-x sm:divide-y-0">
      {/* BCV */}
      <div className="grid h-full grid-cols-2 p-2 sm:block">
        <div className="row-span-2 mb-1 flex items-center justify-start gap-1 text-[10px] font-bold text-slate-500 uppercase sm:justify-end">
          <GrTransaction className="h-4 w-4" /> BCV Oficial{" "}
          <MdRefresh className="h-4 w-4" />
        </div>
        <div className="text-sm font-bold text-white">
          $ {bcvRate ? bcvRate.usd.toFixed(2) : "--"}
        </div>
        <div className="text-xs text-slate-400">
          € {bcvRate ? bcvRate.eur.toFixed(2) : "--"}
        </div>
      </div>

      {/* Binance */}
      <div className="grid h-full grid-cols-2 p-2 sm:block">
        <div className="row-span-2 mb-1 flex items-center justify-start gap-1 text-[10px] font-bold text-slate-500 uppercase sm:justify-end">
          <FaBoltLightning className="h-4 w-4" /> Binance P2P{" "}
          <MdRefresh className="h-4 w-4" />
        </div>
        <div className="text-sm font-bold text-yellow-500">BUY 36.10</div>
        <div className="text-xs font-medium text-orange-400">SELL 35.90</div>
      </div>

      {/* Zelle */}
      <div className="grid h-full grid-cols-2 p-2 sm:block">
        <div className="row-span-2 mb-1 flex items-center justify-start gap-1 text-[10px] font-bold text-slate-500 uppercase sm:justify-end">
          <FaGlobe className="h-4 w-4" /> Zelle{" "}
          <MdModeEdit className="h-4 w-4" />
        </div>
        <div className="text-sm font-bold text-green-400">36.00</div>
      </div>

      {/* Euro */}
      <div className="grid h-full grid-cols-2 p-2 sm:block">
        <div className="row-span-2 mb-1 flex items-center justify-start gap-1 text-[10px] font-bold text-slate-500 uppercase sm:justify-end">
          <FaGlobe className="h-4 w-4" /> Euro (Intl){" "}
          <MdModeEdit className="h-4 w-4" />
        </div>
        <div className="text-sm font-bold text-blue-400">€ 39.00</div>
      </div>
    </div>
  );
};
