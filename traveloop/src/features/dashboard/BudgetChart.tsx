"use client";
// src/features/dashboard/BudgetChart.tsx
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PiggyBank } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrency } from "@/lib/utils";
import axios from "axios";

const COLORS = ["#3a6bff", "#cc44ff", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

const DEMO_DATA = [
  { name: "Flights", value: 1200, color: COLORS[0] },
  { name: "Hotels", value: 800, color: COLORS[1] },
  { name: "Food", value: 450, color: COLORS[2] },
  { name: "Activities", value: 300, color: COLORS[3] },
  { name: "Transport", value: 200, color: COLORS[4] },
  { name: "Other", value: 150, color: COLORS[5] },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass border border-white/[0.08] rounded-xl px-3 py-2 text-sm">
        <p className="font-medium text-surface-200">{payload[0].name}</p>
        <p className="text-surface-400">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export function BudgetChart() {
  const total = DEMO_DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card-premium p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-surface-100">Budget Overview</h3>
          <p className="text-xs text-surface-500 mt-0.5">This month&apos;s spending</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <PiggyBank size={17} className="text-brand-400" />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={DEMO_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {DEMO_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-lg font-bold text-surface-50">{formatCurrency(total)}</p>
            <p className="text-xs text-surface-500">Total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-2">
        {DEMO_DATA.slice(0, 4).map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-xs text-surface-400">{d.name}</span>
            </div>
            <span className="text-xs font-medium text-surface-300">{formatCurrency(d.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
