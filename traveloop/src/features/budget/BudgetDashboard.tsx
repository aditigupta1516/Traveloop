"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiggyBank, Plus, TrendingDown, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight, X, DollarSign, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BudgetChart } from "@/features/dashboard/BudgetChart";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_TRANSACTIONS = [
  { id: 1, title: "Accommodation Deposit", category: "Hotels", amount: -400, date: "May 1, 2026", status: "Paid" },
  { id: 2, title: "Flight Tickets", category: "Flights", amount: -1200, date: "Apr 28, 2026", status: "Paid" },
  { id: 3, title: "Group Fund Contribution", category: "Income", amount: 500, date: "Apr 25, 2026", status: "Received" },
  { id: 4, title: "Local Tour Booking", category: "Activities", amount: -70, date: "Apr 20, 2026", status: "Paid" },
];

const CATEGORIES = ["Flights", "Hotels", "Food", "Activities", "Shopping", "Transport", "Income"];

export function BudgetDashboard() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [showModal, setShowModal] = useState(false);
  const [totalBudget, setTotalBudget] = useState(5000);

  // Form state
  const [newTx, setNewTx] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense"
  });

  const { spent, remaining, percentage } = useMemo(() => {
    const totalSpent = transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0);
    
    const currentRemaining = totalBudget + totalIncome - totalSpent;
    const currentPercentage = (totalSpent / (totalBudget + totalIncome)) * 100;
    
    return {
      spent: totalSpent,
      remaining: currentRemaining,
      percentage: Math.min(currentPercentage, 100)
    };
  }, [transactions, totalBudget]);

  const handleAddTransaction = () => {
    if (!newTx.title || !newTx.amount) {
      toast.error("Please fill in all fields");
      return;
    }

    const amount = Number(newTx.amount) * (newTx.type === "expense" ? -1 : 1);
    const transaction = {
      id: Date.now(),
      title: newTx.title,
      category: newTx.category,
      amount: amount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: newTx.type === "expense" ? "Paid" : "Received"
    };

    setTransactions([transaction, ...transactions]);
    setShowModal(false);
    setNewTx({ title: "", amount: "", category: "Food", type: "expense" });
    toast.success(`${newTx.type === "expense" ? "Expense" : "Income"} added successfully!`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white font-display mb-3 tracking-tight">Budget Manager</h1>
          <p className="text-surface-400 font-medium">Track expenses, split bills, and never overspend.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => { setNewTx(prev => ({ ...prev, type: 'income' })); setShowModal(true); }}
            variant="secondary" 
            className="bg-surface-900/50 border-white/5 rounded-2xl h-14 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-2"
          >
            <TrendingUp size={18} className="text-emerald-400" /> Add Income
          </Button>
          <Button 
            onClick={() => { setNewTx(prev => ({ ...prev, type: 'expense' })); setShowModal(true); }}
            variant="gradient" 
            className="rounded-2xl h-14 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-brand-500/20"
          >
            <Plus size={18} /> Add Expense
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="premium" className="p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
            <PiggyBank size={80} />
          </div>
          <p className="text-[10px] font-black text-surface-500 uppercase tracking-widest mb-2">Total Budget</p>
          <h2 className="text-4xl font-black text-white mb-6 font-display">{formatCurrency(totalBudget)}</h2>
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-xl uppercase tracking-widest">
            <TrendingUp size={14} /> <span>+15% from last trip</span>
          </div>
        </Card>
        
        <Card variant="premium" className="p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-brand-400 group-hover:scale-110 transition-transform duration-500">
            <TrendingDown size={80} />
          </div>
          <p className="text-[10px] font-black text-surface-500 uppercase tracking-widest mb-2">Total Spent</p>
          <h2 className="text-4xl font-black text-white mb-6 font-display">{formatCurrency(spent)}</h2>
          <div className="space-y-3">
             <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-surface-400">{Math.round(percentage)}% of budget used</span>
                <span className="text-brand-400">{formatCurrency(spent)}</span>
             </div>
             <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${percentage}%` }} 
                  transition={{ duration: 1.5, ease: "easeOut" }} 
                  className="h-full bg-gradient-to-r from-brand-600 to-brand-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                />
             </div>
          </div>
        </Card>

        <Card variant="premium" className="p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-amber-400 group-hover:scale-110 transition-transform duration-500">
            <AlertCircle size={80} />
          </div>
          <p className="text-[10px] font-black text-surface-500 uppercase tracking-widest mb-2">Remaining</p>
          <h2 className="text-4xl font-black text-white mb-6 font-display">{formatCurrency(remaining)}</h2>
          <p className="text-[10px] font-black text-surface-500 uppercase tracking-widest bg-white/5 w-fit px-3 py-1.5 rounded-xl">
             ~ {formatCurrency(remaining / 12)} / day for 12 days
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
             <h3 className="text-2xl font-black text-white font-display tracking-tight">Recent Transactions</h3>
             <Button variant="secondary" size="sm" className="bg-white/5 border-white/5 text-[10px] font-black uppercase tracking-widest rounded-xl">Export CSV</Button>
          </div>
          
          <div className="bg-surface-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.02] text-surface-500">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Description</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {transactions.map((tx) => (
                      <motion.tr 
                        key={tx.id} 
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hover:bg-white/[0.03] transition-colors group"
                      >
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="font-bold text-white text-base group-hover:text-brand-400 transition-colors">{tx.title}</span>
                              <span className="text-[10px] text-surface-500 font-black uppercase tracking-widest mt-1">Ref ID: {tx.id.toString().slice(-4)}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <Badge variant="secondary" className="bg-white/5 text-surface-400 font-bold px-3 py-1 rounded-lg border-white/5 uppercase tracking-widest text-[9px]">{tx.category}</Badge>
                        </td>
                        <td className="px-8 py-6 text-surface-400 font-medium">{tx.date}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={cn("w-2 h-2 rounded-full", tx.status === "Paid" ? "bg-emerald-500" : "bg-indigo-500")} />
                             <span className={cn("text-[10px] font-black uppercase tracking-widest", tx.status === "Paid" ? "text-emerald-400" : "text-indigo-400")}>{tx.status}</span>
                          </div>
                        </td>
                        <td className={`px-8 py-6 text-right font-black text-lg ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                          <div className="flex items-center justify-end gap-2 font-display">
                            {tx.amount > 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} className="text-rose-500" />}
                            {formatCurrency(Math.abs(tx.amount))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sticky top-10 space-y-8">
           <div className="p-8 rounded-[2.5rem] bg-surface-900/50 border border-white/5 shadow-2xl">
              <h3 className="text-xl font-black text-white font-display mb-8 tracking-tight">Spending Breakdown</h3>
              <BudgetChart />
              <div className="mt-8 space-y-4">
                 {['Flights', 'Hotels', 'Food'].map(cat => (
                   <div key={cat} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                         <div className={cn("w-3 h-3 rounded-full", cat === 'Flights' ? 'bg-brand-500' : cat === 'Hotels' ? 'bg-purple-500' : 'bg-emerald-500')} />
                         <span className="text-[10px] font-black text-surface-300 uppercase tracking-widest">{cat}</span>
                      </div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">
                         {formatCurrency(Math.abs(transactions.filter(t => t.category === cat).reduce((a, b) => a + b.amount, 0)))}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-surface-950 border border-white/10 rounded-[3.5rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-10 right-10 text-surface-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-10 text-center">
                 <div className="w-20 h-20 rounded-[2rem] bg-brand-500/10 flex items-center justify-center mx-auto mb-6 border border-brand-500/20">
                    <Wallet size={32} className="text-brand-400" />
                 </div>
                 <h2 className="text-4xl font-black text-white font-display mb-2 tracking-tight">
                    Add {newTx.type === 'expense' ? 'Expense' : 'Income'}
                 </h2>
                 <p className="text-surface-500 font-medium">Record a new transaction for your trip</p>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] ml-2">Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dinner at Tokyo Tower"
                      value={newTx.title}
                      onChange={e => setNewTx(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-surface-900 border border-white/5 rounded-2xl h-16 px-6 text-white font-bold placeholder:text-surface-700 focus:border-brand-500/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] ml-2">Amount ($)</label>
                    <div className="relative">
                       <DollarSign size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-400" />
                       <input 
                         type="number" 
                         placeholder="0.00"
                         value={newTx.amount}
                         onChange={e => setNewTx(prev => ({ ...prev, amount: e.target.value }))}
                         className="w-full bg-surface-900 border border-white/5 rounded-2xl h-16 pl-14 pr-6 text-white font-black text-xl focus:border-brand-500/50 outline-none transition-all"
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] ml-2">Category</label>
                   <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setNewTx(prev => ({ ...prev, category: cat }))}
                          className={cn(
                            "h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                            newTx.category === cat 
                              ? "bg-brand-500 text-white border-brand-400 shadow-lg shadow-brand-500/20" 
                              : "bg-surface-900 text-surface-500 border-white/5 hover:border-white/10 hover:text-white"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>

                <Button 
                  onClick={handleAddTransaction}
                  variant="gradient" 
                  className="w-full h-16 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand-500/20 mt-4"
                >
                  Confirm Transaction
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
