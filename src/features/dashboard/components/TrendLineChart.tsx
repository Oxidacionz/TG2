import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { LineDataPoint } from "../types/analytics";

interface Props {
  data: LineDataPoint[];
}

export const TrendLineChart = ({ data }: Props) => {
  return (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
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
          border: "1px solid #e2e8f0",
        }}
      />
      <Line
        type="monotone"
        dataKey="volume"
        stroke="#2563eb"
        strokeWidth={3}
        dot={{ r: 4, fill: "#2563eb" }}
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="profit"
        stroke="#10b981"
        strokeWidth={3}
        dot={{ r: 4, fill: "#10b981" }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
};
