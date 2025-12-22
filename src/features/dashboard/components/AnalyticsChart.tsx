import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { Card } from "@core/layout/Card";
import { TrendLineChart } from "./TrendLineChart";
import { DistributionPieChart } from "./DistributionPieChart";

import { LineDataPoint, PieDataPoint } from "../types/analytics";

export const CHART_TYPES = {
  LINE: "line",
  PIE: "pie",
} as const;

type ChartType = (typeof CHART_TYPES)[keyof typeof CHART_TYPES];

interface Props {
  lineData: LineDataPoint[];
  pieData: PieDataPoint[];
}

const CHART_CONFIG = {
  [CHART_TYPES.LINE]: {
    title: "Tendencia de Volumen vs Ganancia",
    icon: <MdSpaceDashboard />,
  },
  [CHART_TYPES.PIE]: {
    title: "Distribución Entrada vs Salida",
    icon: <IoIosStats />,
  },
};

export const AnalyticsChart = ({ lineData, pieData }: Props) => {
  const [chartType, setChartType] = useState<ChartType>(CHART_TYPES.LINE);

  const { title } = CHART_CONFIG[chartType];

  const renderChart = () => {
    if (chartType === CHART_TYPES.LINE) {
      return <TrendLineChart data={lineData} />;
    }
    return <DistributionPieChart data={pieData} />;
  };

  return (
    <Card className="flex w-full flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {title}
        </h3>

        <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
          {Object.values(CHART_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`rounded p-2 shadow-sm transition-colors ${
                chartType === type
                  ? "bg-white text-slate-800 dark:bg-slate-600 dark:text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {CHART_CONFIG[type].icon}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-full w-full flex-row pb-10">
        <ResponsiveContainer height={400} width="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
