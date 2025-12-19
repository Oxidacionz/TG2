// COMPONENTE CRITICO

import { useState } from "react";
import { useOutletContext } from "react-router";
import { MOCK_DATA } from "../mocks/mockData";
import { DashboardContextType } from "../types";

// Organisms/Molecules
import { GlobalRateCard } from "../components/molecules/GlobalRateCard";
import { DigitalClock } from "@core/display/DigitalClock";
import { TickerBoard } from "../components/organisms/TickerBoard";
import { StatsOverview } from "../components/organisms/StatsOverview";
import { AnalyticsChart } from "../components/organisms/AnalyticsChart";
import { EditRateModal } from "../components/organisms/EditRateModal";

export const DashboardView = () => {
  const { refreshTrigger } = useOutletContext<DashboardContextType>();
  // To avoid unused warning if we want to keep it available for future use:
  console.log("Dashboard refreshed", refreshTrigger);

  const [stats] = useState({
    totalVolume: 0,
    netProfit: 0,
    pendingCount: 0,
    totalCapital: 0,
  });

  // BCV State removed (unused)

  // Config State (Tasa Global)
  const [globalRate, setGlobalRate] = useState("36.00");
  const [isEditRateOpen, setIsEditRateOpen] = useState(false);

  // Chart State
  const [lineData] = useState(MOCK_DATA.chartData);
  const [pieData] = useState<{ name: string; value: number; color?: string }[]>(
    [],
  );

  const handleUpdateRate = (newRate: string) => {
    const formattedRate = parseFloat(newRate).toFixed(2);
    setGlobalRate(formattedRate);
    localStorage.setItem("globalRate", formattedRate);

    // Try to update DB if table exists (MOCKED)
    console.log("Mock update rate:", formattedRate);

    setIsEditRateOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-6 overflow-x-hidden">
      {/* --- TOP BANNER --- */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] xl:flex-row">
        <GlobalRateCard
          rate={globalRate}
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
