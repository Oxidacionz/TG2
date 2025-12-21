import React from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { useExchangeRates } from "@features/exchange-rates";

interface Props {
  onEdit: () => void;
}

export const GlobalRateCard = React.memo((props: Props) => {
  const { ratesMap, isLoading } = useExchangeRates();
  const globalRate = ratesMap["Internal-VES"]?.value;
  const { onEdit } = props;

  return (
    <div className="group relative flex flex-1 items-center justify-between bg-blue-600 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white/20 p-2 text-white">
          <FaHandHoldingDollar className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold tracking-wider text-blue-100 uppercase">
              Tasa Global
            </p>
          </div>
          <p className="text-2xl font-bold text-white">
            {globalRate > 0 ? globalRate.toFixed(2) : "--"} Bs
          </p>
        </div>
      </div>
      {/* Edit Button (Absolute) */}
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
      >
        <MdModeEdit className="h-4 w-4" />
      </button>

      {/* Vertical Separator (Visual for desktop) */}
      <div className="absolute top-2 right-0 bottom-2 hidden w-px bg-blue-500/50 md:block"></div>
    </div>
  );
});

GlobalRateCard.displayName = "GlobalRateCard";
