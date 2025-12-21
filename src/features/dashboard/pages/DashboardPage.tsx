import { useState } from "react";
import { useOutletContext } from "react-router";
import { MOCK_DATA } from "../mocks/mockData";
import { DashboardContextType } from "@/types";
import { GlobalRateCard } from "@features/exchange-rates/components/GlobalRateCard";
import { DigitalClock } from "@core/display/DigitalClock";
import { StatsOverview } from "../components/StatsOverview";
import { AnalyticsChart } from "../components/AnalyticsChart";
import { TickerBoard } from "../components/TickerBoard";
import { EditRateModal } from "@features/exchange-rates/components/EditRateModal";

export const DashboardPage = () => {
  const { refreshTrigger } = useOutletContext<DashboardContextType>();
  console.log("Dashboard refreshed", refreshTrigger);

  const [stats] = useState({
    totalVolume: 0,
    netProfit: 0,
    pendingCount: 0,
    totalCapital: 0,
  });

  const [globalRate, setGlobalRate] = useState("36.00");
  const [isEditRateOpen, setIsEditRateOpen] = useState(false);

  const [lineData] = useState(MOCK_DATA.chartData);
  const [pieData] = useState<{ name: string; value: number; color?: string }[]>(
    [],
  );

  const handleUpdateRate = (newRate: string) => {
    const formattedRate = parseFloat(newRate).toFixed(2);
    setGlobalRate(formattedRate);
    localStorage.setItem("globalRate", formattedRate);

    console.log("Mock update rate:", formattedRate);

    setIsEditRateOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-6 overflow-x-hidden">
      {/* --- TOP BANNER --- */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] xl:flex-row">
        <GlobalRateCard
          onEdit={() => {
            setIsEditRateOpen(true);
          }}
        />
        <DigitalClock />
        <TickerBoard />
      </div>

      {/* --- STATS OVERVIEW --- */}
      <StatsOverview stats={stats} />

      {/* --- ANALYTICS CHART --- */}
      <AnalyticsChart lineData={lineData} pieData={pieData} />

      {/* --- MODALS --- */}
      <EditRateModal
        isOpen={isEditRateOpen}
        onClose={() => setIsEditRateOpen(false)}
        onSave={handleUpdateRate}
        currentRate={globalRate}
      />
    </div>
  );
};
