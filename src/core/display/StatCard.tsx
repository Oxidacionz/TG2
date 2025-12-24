import React, { ReactNode } from "react";

import { Card } from "@core/layout/Card";

interface Props {
  title: string;
  value: string;
  subtext: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "yellow";
}

export const StatCard = React.memo((props: Props) => {
  const { title, value, subtext, icon, color = "blue" } = props;
  const colors = {
    blue: "text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400",
    green:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    yellow:
      "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
  };
  return (
    <Card className="flex h-32 flex-col justify-between p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>
        <div className={`rounded-lg p-2 ${colors[color]}`}>{icon}</div>
      </div>
      <p className={`mt-2 text-xs ${colors[color].split(" ")[0]}`}>{subtext}</p>
    </Card>
  );
});

StatCard.displayName = "StatCard";
