"use client";
// src/features/budget/BudgetDashboard.tsx
import { motion } from "framer-motion";
import { PiggyBank, Plus, TrendingDown, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BudgetChart } from "@/features/dashboard/BudgetChart";
import { formatCurrency } from "@/lib/utils";

const TRANSACTIONS = [
  { id: 1, title: "Shinjuku Hotel Deposit", category: "Hotels", amount: -400, date: "Oct 1, 2026", status: "Paid" },
  { id: 2, title: "ANA Flight Tickets", category: "Flights", amount: -1200, date: "Sep 28, 2026", status: "Paid" },
  { id: 3, title: "Group Fund Contribution", category: "Income", amount: 500, date: "Sep 25, 2026", status: "Received" },
  { id: 4, title: "TeamLab Planets Tickets", category: "Activities", amount: -70, date: "Sep 20, 2026", status: "Paid" },
];

export function BudgetDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Budget Manager</h1>
          <p className="text-surface-400">Track expenses, split bills, and never overspend.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<TrendingUp size={16} />}>Add Income</Button>
          <Button variant="gradient" icon={<Plus size={16} />}>Add Expense</Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="premium" className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-400">
            <PiggyBank size={64} />
          </div>
          <p className="text-sm text-surface-400 font-medium mb-1">Total Budget</p>
          <h2 className="text-3xl font-bold text-surface-50 mb-4">$5,000.00</h2>
          <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 w-fit px-2.5 py-1 rounded-lg">
            <TrendingUp size={14} /> <span>+15% from last trip</span>
          </div>
        </Card>
        
        <Card variant="premium" className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-brand-400">
            <TrendingDown size={64} />
          </div>
          <p className="text-sm text-surface-400 font-medium mb-1">Total Spent</p>
          <h2 className="text-3xl font-bold text-surface-50 mb-4">$1,670.00</h2>
          <div className="flex items-center gap-2 text-sm text-surface-300">
            <span>33% of budget used</span>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 h-1.5 bg-surface-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "33%" }} transition={{ duration: 1 }} className="h-full bg-brand-500" />
          </div>
        </Card>

        <Card variant="premium" className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-400">
            <AlertCircle size={64} />
          </div>
          <p className="text-sm text-surface-400 font-medium mb-1">Remaining</p>
          <h2 className="text-3xl font-bold text-surface-50 mb-4">$3,330.00</h2>
          <p className="text-sm text-surface-500">~ $277 / day for 12 days</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-surface-100">Recent Transactions</h3>
          <div className="bg-surface-900 border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-800/50 text-surface-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium text-surface-200">{tx.title}</td>
                      <td className="px-6 py-4 text-surface-400">{tx.category}</td>
                      <td className="px-6 py-4 text-surface-400">{tx.date}</td>
                      <td className="px-6 py-4">
                        <Badge variant={tx.status === "Paid" ? "success" : "primary"}>{tx.status}</Badge>
                      </td>
                      <td className={`px-6 py-4 text-right font-medium ${tx.amount > 0 ? "text-emerald-400" : "text-surface-100"}`}>
                        <div className="flex items-center justify-end gap-1">
                          {tx.amount > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} className="text-red-400" />}
                          {formatCurrency(Math.abs(tx.amount))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <BudgetChart />
        </div>
      </div>
    </div>
  );
}
