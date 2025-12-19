import { BCVTicker } from "./BCVTicker";
import { BinanceTicker } from "./BinanceTicker";

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
