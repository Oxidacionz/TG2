import React, { ReactNode } from 'react';
import { Card } from '../atoms/Card';

export const StatCard: React.FC<{ title: string; value: string; subtext: string; icon?: ReactNode; color?: 'blue'|'green'|'yellow' }> = ({ title, value, subtext, icon, color = 'blue' }) => {
  const colors = {
    blue: "text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400",
    green: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    yellow: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
  };
  return (
    <Card className="p-4 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
      <p className={`text-xs mt-2 ${colors[color].split(' ')[0]}`}>{subtext}</p>
    </Card>
  );
};
