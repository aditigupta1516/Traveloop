"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map, PiggyBank, Users, Globe, TrendingUp, Clock,
  Plus, Compass, BookOpen, CheckSquare, ArrowRight,
  Sparkles, Sunrise, Sun, Sunset, Moon, Search, MapPin, 
  Calendar, DollarSign, Star, Zap
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SkeletonDashboard } from "@/components/ui/Skeleton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BudgetChart } from "@/features/dashboard/BudgetChart";
import { RecentActivity } from "@/features/dashboard/RecentActivity";
import { UpcomingTrips } from "@/features/dashboard/UpcomingTrips";
import { formatCurrency } from "@/lib/utils";
import axios from "axios";
import dynamic from "next/dynamic";

const LiveTravelMap = dynamic(() => import("@/features/dashboard/LiveTravelMap"), { 
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-surface-900/50 animate-pulse rounded-[2.5rem]" />
});

const REGIONS = [
  { name: 'Europe',         img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80', desc: '44 Countries', color: 'from-indigo-500/30' },
  { name: 'Southeast Asia', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', desc: '11 Countries', color: 'from-purple-500/30' },
  { name: 'South Asia',     img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', desc: '8 Countries',  color: 'from-sky-500/30'    },
  { name: 'Americas',       img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', desc: '35 Countries', color: 'from-emerald-500/30' },
  { name: 'Middle East',    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', desc: '18 Countries', color: 'from-amber-500/30'   },
  { name: 'Africa',         img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', desc: '54 Countries', color: 'from-rose-500/30'    },
];

const QUICK_ACTIONS = [
  { icon: Plus,    label: 'Plan a Trip',          href: '/trips/new', color: 'from-indigo-500 to-purple-600', bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.25)' },
  { icon: Search,  label: 'Explore Activities',   href: '/explore',      color: 'from-sky-500 to-blue-600',     bg: 'rgba(14,165,233,0.1)',  border: 'rgba(14,165,233,0.25)' },
  { icon: Map,     label: 'View Itinerary',       href: '/trips',    color: 'from-emerald-500 to-teal-600', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)' },
  { icon: Users,   label: 'Collaborate',            href: '/collaborate',   color: 'from-rose-500 to-pink-600',    bg: 'rgba(244,63,94,0.1)',   border: 'rgba(244,63,94,0.25)'  },
];

const HERO_IMGS = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80',
];

function getGreeting(name: string) {
  const hour = new Date().getHours();
  if (hour < 12) return { text: `Good morning`, icon: Sunrise };
  if (hour < 17) return { text: `Good afternoon`, icon: Sun };
  if (hour < 20) return { text: `Good evening`, icon: Sunset };
  return { text: `Good night`, icon: Moon };
}

export function DashboardContent({ user }: { user: any }) {
  const greeting = getGreeting(user?.name ?? "Traveler");
  const firstName = user?.name?.split(" ")[0] || "Traveler";

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => axios.get("/api/dashboard/stats").then((r) => r.data),
  });

  const statCards = [
    { key: "totalTrips", icon: Globe, label: 'Total Trips', color: '#6366f1', bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.25)' },
    { key: "upcomingTrips", icon: Calendar, label: 'Upcoming', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)',  border: 'rgba(14,165,233,0.25)' },
    { key: "completedTrips", icon: Clock, label: 'Completed', color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)' },
    { key: "totalBudget", icon: DollarSign, label: 'Budget Tracked', color: '#a855f7', bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.25)', isCurrency: true },
  ];

  return (
    <div className="flex flex-col gap-12 pb-20 max-w-[1600px] mx-auto">
      {/* ── Hero Banner ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[3rem] shadow-2xl border border-white/5 min-h-[350px]"
      >
        <img
          src={HERO_IMGS[0]}
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
        
        <div className="relative z-10 px-12 py-16 flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 mb-4">
            <Compass size={16} className="text-brand-400" />
            <p className="text-brand-300 text-sm font-bold uppercase tracking-widest">{greeting.text}, {firstName}! 🌍</p>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 font-display leading-tight">
            Where to <span className="text-brand-400">next?</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/trips/new">
              <Button variant="gradient" size="lg" className="px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-brand-500/20" icon={<Plus size={22} />}>
                Plan a Trip <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards ───────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-8 rounded-[2rem] border transition-all duration-300 hover:scale-[1.02] bg-surface-900/40 backdrop-blur-md"
            style={{ borderColor: card.border }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center transition-transform" style={{ background: `${card.color}20` }}>
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <TrendingUp size={16} className="text-surface-600" />
            </div>
            <div className="text-4xl font-black text-white mb-1 font-display tracking-tight">
              {statsLoading ? (
                <div className="h-10 w-24 bg-white/5 animate-pulse rounded" />
              ) : card.isCurrency ? (
                formatCurrency(stats?.[card.key] ?? 0)
              ) : (
                <AnimatedCounter value={stats?.[card.key] ?? 0} />
              )}
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: `${card.color}cc` }}>{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Quick Actions ─────────────────────────────── */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-1 h-brand-500 rounded-full" />
          <h2 className="text-2xl font-black text-surface-50 font-display uppercase tracking-wider">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((action, i) => (
            <Link key={action.label} href={action.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border transition-all duration-300 group bg-surface-900/40 backdrop-blur-md"
                style={{ borderColor: action.border }}
              >
                <div className={`h-16 w-16 rounded-3xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all`}>
                  <action.icon size={28} className="text-white" />
                </div>
                <span className="text-sm font-black text-surface-300 group-hover:text-white transition-colors tracking-widest uppercase">{action.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Live Travel Map (Full Width, No Overlap) ────── */}
      <section className="relative z-10 py-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 bg-brand-500 rounded-full" />
            <h2 className="text-2xl font-black text-surface-50 font-display uppercase tracking-wider flex items-center gap-3">
               Interactive Route Explorer
            </h2>
          </div>
        </div>
        <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
          <LiveTravelMap />
        </div>
      </section>

      {/* ── Top Regional Selections ───────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 bg-brand-500 rounded-full" />
            <h2 className="text-2xl font-black text-surface-50 font-display uppercase tracking-wider">Trending Regions</h2>
          </div>
          <Link href="/explore" className="text-xs font-black text-brand-400 hover:text-brand-300 uppercase tracking-widest flex items-center gap-2">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {REGIONS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              whileHover={{ y: -10 }}
              className="relative rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 group aspect-[3/4] shadow-xl"
            >
              <img src={r.img} alt={r.name} className="h-full w-full object-cover group-hover:scale-115 transition-transform duration-700" />
              <div className={`absolute inset-0 bg-gradient-to-t ${r.color} via-transparent to-transparent opacity-60`} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-lg font-black leading-tight font-display tracking-tight">{r.name}</p>
                <p className="text-surface-400 text-[10px] font-bold mt-1 uppercase tracking-widest">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Main Content Grid ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <UpcomingTrips />
          
          {/* AI Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] gradient-brand p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-brand-500/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-white" />
                <span className="text-white/90 text-[10px] font-black uppercase tracking-[0.3em]">AI Intelligence</span>
              </div>
              <h3 className="text-white text-3xl font-black mb-3 font-display leading-tight">Let AI plan your next trip</h3>
              <p className="text-white/80 text-sm max-w-md font-medium leading-relaxed">Tell us your destination and get a complete, personalized itinerary in seconds with our advanced neural engine.</p>
            </div>
            <Link href="/trips/new?ai=true">
              <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-10 py-7 text-lg rounded-2xl" icon={<Zap size={22} />}>
                Try AI Builder
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="space-y-12">
          <BudgetChart />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
