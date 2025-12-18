import { useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { Card } from "../atoms/Card";

interface LineDataPoint {
  name: string;
  volume: number;
  profit: number;
}

interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
  [key: string]: string | number | undefined;
}

interface Props {
  lineData: LineDataPoint[];
  pieData: PieDataPoint[];
}

export const AnalyticsChart = (props: Props) => {
  const { lineData, pieData } = props;
  const [chartType, setChartType] = useState<"line" | "pie">("line");
  const COLORS = ["#10b981", "#ef4444"];

  return (
    <Card className="flex w-full flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {chartType === "line"
            ? "Tendencia de Volumen vs Ganancia"
            : "Distribución Entrada vs Salida"}
        </h3>
        <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
          <button
            onClick={() => setChartType("line")}
            className={`rounded p-2 shadow-sm ${
              chartType === "line"
                ? "bg-white text-slate-800 dark:bg-slate-600 dark:text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <MdSpaceDashboard />
          </button>
          <button
            onClick={() => setChartType("pie")}
            className={`rounded p-2 shadow-sm ${
              chartType === "pie"
                ? "bg-white text-slate-800 dark:bg-slate-600 dark:text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <IoIosStats />
          </button>
        </div>
      </div>

      <div className="flex h-full w-full flex-row pb-10">
        <ResponsiveContainer height={400} width="100%">
          {chartType === "line" ? (
            <LineChart data={lineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
