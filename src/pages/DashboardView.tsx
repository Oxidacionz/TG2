import { useState } from "react";
import { useOutletContext } from "react-router";
import { MOCK_DATA } from "../mocks/mockData";
import { DashboardContextType } from "../types";

// Organisms/Molecules
import { GlobalRateCard } from "../components/molecules/GlobalRateCard";
import { DigitalClock } from "../components/molecules/DigitalClock";
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

  // BCV State
  const [bcvRate] = useState<{ usd: number; eur: number } | null>({
    usd: 247.3003,
    eur: 286.40342343,
  });

  // Config State (Tasa Global)
  const [globalRate, setGlobalRate] = useState("36.00");
  const [isEditRateOpen, setIsEditRateOpen] = useState(false);
  const [tempRate, setTempRate] = useState("");

  // Chart State
  const [lineData] = useState(MOCK_DATA.chartData);
  const [pieData] = useState<{ name: string; value: number; color?: string }[]>(
    [],
  );

  const handleUpdateRate = () => {
    const newRate = parseFloat(tempRate).toFixed(2);
    setGlobalRate(newRate);
    localStorage.setItem("globalRate", newRate);

    // Try to update DB if table exists (MOCKED)
    console.log("Mock update rate:", newRate);

    setIsEditRateOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-6 overflow-x-hidden">
      {/* --- TOP BANNER --- */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] xl:flex-row">
        <GlobalRateCard
          rate={globalRate}
          onEdit={() => {
            setTempRate(globalRate);
            setIsEditRateOpen(true);
          }}
        />
        <DigitalClock />
        <TickerBoard bcvRate={bcvRate} />
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
        tempRate={tempRate}
        setTempRate={setTempRate}
      />
    </div>
  );
};
