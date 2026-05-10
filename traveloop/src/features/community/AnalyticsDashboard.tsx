"use client";
// src/features/community/AnalyticsDashboard.tsx
import { motion } from "framer-motion";
import { BarChart3, Globe, Plane, PiggyBank, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const SPENDING_DATA = [
  { name: "Jan", amount: 400 },
  { name: "Feb", amount: 300 },
  { name: "Mar", amount: 1200 },
  { name: "Apr", amount: 200 },
  { name: "May", amount: 800 },
  { name: "Jun", amount: 2500 },
];

const TRAVEL_DAYS_DATA = [
  { name: "2021", days: 12 },
  { name: "2022", days: 18 },
  { name: "2023", days: 14 },
  { name: "2024", days: 32 },
  { name: "2025", days: 45 },
  { name: "2026", days: 28 },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Travel Analytics</h1>
        <p className="text-surface-400">Visualize your travel history, spending trends, and milestones.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-brand-900/40 to-surface-900">
          <Globe size={48} className="absolute -bottom-4 -right-4 text-brand-500/20" />
          <h3 className="text-surface-400 font-medium mb-1">Countries Visited</h3>
          <p className="text-4xl font-bold text-surface-50 font-display">14</p>
        </Card>
        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-surface-900">
          <Plane size={48} className="absolute -bottom-4 -right-4 text-emerald-500/20" />
          <h3 className="text-surface-400 font-medium mb-1">Total Flights</h3>
          <p className="text-4xl font-bold text-surface-50 font-display">32</p>
        </Card>
        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-amber-900/40 to-surface-900">
          <Calendar size={48} className="absolute -bottom-4 -right-4 text-amber-500/20" />
          <h3 className="text-surface-400 font-medium mb-1">Days Traveled</h3>
          <p className="text-4xl font-bold text-surface-50 font-display">149</p>
        </Card>
        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-accent-900/40 to-surface-900">
          <PiggyBank size={48} className="absolute -bottom-4 -right-4 text-accent-500/20" />
          <h3 className="text-surface-400 font-medium mb-1">Total Spent</h3>
          <p className="text-4xl font-bold text-surface-50 font-display">$12.4k</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Trends */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-surface-100 flex items-center gap-2"><BarChart3 size={20} className="text-brand-400" /> Spending Trends</h2>
              <p className="text-sm text-surface-400">Monthly travel expenses</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPENDING_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3a6bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3a6bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#3a6bff" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Travel Days */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-surface-100 flex items-center gap-2"><Calendar size={20} className="text-emerald-400" /> Travel Days per Year</h2>
              <p className="text-sm text-surface-400">Total days spent on trips</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRAVEL_DAYS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="days" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
