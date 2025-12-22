import { useState } from "react";
import { useOutletContext } from "react-router";
import { MOCK_DATA } from "../mocks/mockData";
import { DashboardContextType } from "@/types";
import { GlobalRateCard } from "@features/exchange-rates/components/GlobalRateCard";
import { DigitalClock } from "@core/display/DigitalClock";
import { StatsOverview } from "../components/StatsOverview";
import { AnalyticsChart } from "../components/AnalyticsChart";
import { TickerBoard } from "../components/TickerBoard";

export const DashboardPage = () => {
  const { refreshTrigger } = useOutletContext<DashboardContextType>();
  console.log("Dashboard refreshed", refreshTrigger);

  const [stats] = useState({
    totalVolume: 0,
    netProfit: 0,
    pendingCount: 0,
    totalCapital: 0,
  });

  const [lineData] = useState(MOCK_DATA.chartData);
  const [pieData] = useState<{ name: string; value: number; color?: string }[]>(
    [],
  );

  return (
    <div className="flex w-full flex-col gap-6 overflow-x-hidden">
      <div className="bg-brand-900 flex flex-col overflow-hidden rounded-xl border border-slate-800 xl:flex-row">
        <GlobalRateCard />
        <DigitalClock />
        <TickerBoard />
      </div>

      <StatsOverview stats={stats} />

      <AnalyticsChart lineData={lineData} pieData={pieData} />
    </div>
  );
};
