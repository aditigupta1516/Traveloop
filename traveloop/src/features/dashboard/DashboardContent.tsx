"use client";
// src/features/dashboard/DashboardContent.tsx
import { motion } from "framer-motion";
import {
  Map, PiggyBank, Users, Globe, TrendingUp, Clock,
  Plus, Compass, BookOpen, CheckSquare, ArrowRight,
  Sparkles, Sunrise, Sun, Sunset, Moon, CloudSun,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge, TripStatusBadge } from "@/components/ui/Badge";
import { SkeletonCard, SkeletonDashboard } from "@/components/ui/Skeleton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BudgetChart } from "@/features/dashboard/BudgetChart";
import { RecentActivity } from "@/features/dashboard/RecentActivity";
import { UpcomingTrips } from "@/features/dashboard/UpcomingTrips";
import { RecommendedDestinations } from "@/features/dashboard/RecommendedDestinations";
import { formatCurrency, getDaysUntil } from "@/lib/utils";
import axios from "axios";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function getGreeting(name: string) {
  const hour = new Date().getHours();
  if (hour < 12) return { text: `Good morning, ${name?.split(" ")[0]} 🌅`, icon: Sunrise };
  if (hour < 17) return { text: `Good afternoon, ${name?.split(" ")[0]} ☀️`, icon: Sun };
  if (hour < 20) return { text: `Good evening, ${name?.split(" ")[0]} 🌇`, icon: Sunset };
  return { text: `Good night, ${name?.split(" ")[0]} 🌙`, icon: Moon };
}

const STAT_CARDS = [
  { key: "totalTrips", label: "Total Trips", icon: Map, color: "brand", suffix: "" },
  { key: "upcomingTrips", label: "Upcoming", icon: Globe, color: "purple", suffix: "" },
  { key: "totalBudget", label: "Total Budget", icon: PiggyBank, color: "emerald", isCurrency: true },
  { key: "countriesVisited", label: "Countries", icon: Compass, color: "amber", suffix: "" },
];

export function DashboardContent({ user }: { user: any }) {
  const greeting = getGreeting(user?.name ?? "Traveler");

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => axios.get("/api/dashboard/stats").then((r) => r.data),
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-surface-50 font-display">{greeting.text}</h1>
          <p className="text-surface-400 mt-1">Ready to plan your next adventure?</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/trips/new">
            <Button variant="gradient" size="md" icon={<Plus size={16} />}>New Trip</Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary" size="md" icon={<Compass size={16} />}>Explore</Button>
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { icon: Plus, label: "Create Trip", href: "/trips/new", color: "text-brand-400" },
          { icon: BookOpen, label: "Add Journal", href: "/journal/new", color: "text-accent-400" },
          { icon: CheckSquare, label: "Packing List", href: "/packing", color: "text-emerald-400" },
          { icon: PiggyBank, label: "Log Expense", href: "/budget", color: "text-amber-400" },
        ].map((action) => (
          <motion.div key={action.label} variants={item}>
            <Link href={action.href}>
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="glass border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 cursor-pointer group transition-all hover:border-white/10"
              >
                <div className={`w-9 h-9 rounded-xl bg-surface-800 flex items-center justify-center group-hover:scale-110 transition-transform ${action.color}`}>
                  <action.icon size={17} />
                </div>
                <span className="text-sm font-medium text-surface-300 group-hover:text-surface-100 transition-colors">{action.label}</span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Grid */}
      {statsLoading ? (
        <SkeletonDashboard />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STAT_CARDS.map((card) => (
            <motion.div key={card.key} variants={item}>
              <div className={`card-premium p-5`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  card.color === "brand" ? "bg-brand-500/10" :
                  card.color === "purple" ? "bg-accent-500/10" :
                  card.color === "emerald" ? "bg-emerald-500/10" : "bg-amber-500/10"
                }`}>
                  <card.icon size={20} className={
                    card.color === "brand" ? "text-brand-400" :
                    card.color === "purple" ? "text-accent-400" :
                    card.color === "emerald" ? "text-emerald-400" : "text-amber-400"
                  } />
                </div>
                <div className="text-2xl font-bold text-surface-50 font-display">
                  {card.isCurrency
                    ? formatCurrency(stats?.[card.key] ?? 0)
                    : <AnimatedCounter value={stats?.[card.key] ?? 0} suffix={card.suffix} />
                  }
                </div>
                <p className="text-xs text-surface-500 mt-0.5">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2">
          <UpcomingTrips />
        </div>

        {/* Budget Chart */}
        <div>
          <BudgetChart />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Destinations */}
        <div className="lg:col-span-2">
          <RecommendedDestinations />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* AI Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl gradient-brand p-6 flex items-center justify-between gap-4"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-white/80" />
            <span className="text-white/80 text-sm font-medium">AI-Powered</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-1">Let AI plan your next trip</h3>
          <p className="text-white/70 text-sm">Tell us your destination and get a complete itinerary in seconds.</p>
        </div>
        <Link href="/trips/new?ai=true">
          <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-shrink-0" icon={<Sparkles size={15} />} iconRight={<ArrowRight size={15} />}>
            Try AI Builder
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
