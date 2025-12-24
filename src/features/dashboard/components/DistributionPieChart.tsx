import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

import { PieDataPoint } from "../types/analytics";

interface Props {
  data: PieDataPoint[];
}

const COLORS = ["#10b981", "#ef4444"];

export const DistributionPieChart = ({ data }: Props) => {
  return (
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={8}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke="none"
          />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          borderRadius: "8px",
          border: "none",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
      />
      <Legend verticalAlign="bottom" height={36} iconType="circle" />
    </PieChart>
  );
};
