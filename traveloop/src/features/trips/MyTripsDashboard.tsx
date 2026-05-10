"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, CheckCircle, Plus, ArrowRight, Search, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/Button";

const TABS = ["Ongoing", "Upcoming", "Completed"] as const;
type TabType = typeof TABS[number];

const statusMap: Record<TabType, (t: any) => boolean> = {
  Ongoing:   (t) => t.status === "ONGOING",
  Upcoming:  (t) => t.status === "UPCOMING" || t.status === "PLANNING",
  Completed: (t) => t.status === "COMPLETED",
};

const TAB_THEMES = {
  Ongoing:   { active: 'text-indigo-400', bg: 'bg-indigo-500/15 border-indigo-500/30', icon: Clock },
  Upcoming:  { active: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/30', icon: Calendar },
  Completed: { active: 'text-emerald-400',bg: 'bg-emerald-500/15 border-emerald-500/30',icon: CheckCircle },
};

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
];

export function MyTripsDashboard({ statusFilter }: { statusFilter?: string }) {
  const [active, setActive] = useState<TabType>(
    statusFilter === "ONGOING" ? "Ongoing" : statusFilter === "PLANNED" ? "Upcoming" : "Upcoming"
  );
  const router = useRouter();

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ["all-trips"],
    queryFn: () => axios.get("/api/user-trips").then((r) => r.data),
  });

  const filtered = trips.filter((t: any) => statusMap[active]?.(t));

  return (
    <div className="flex-1 max-w-5xl mx-auto px-6 py-8">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2 font-display">My Trips</h1>
        <p className="text-surface-500 text-sm font-medium">{trips.length} trips planned</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map(tab => {
          const { icon: Icon, bg, active: activeColor } = TAB_THEMES[tab];
          const count = trips.filter(t => statusMap[tab]?.(t)).length;
          const isTabActive = active === tab;
          
          return (
            <button 
              key={tab} 
              onClick={() => setActive(tab)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all border
                ${isTabActive
                  ? `${bg} ${activeColor} border-white/5 shadow-lg`
                  : 'text-surface-500 border-transparent hover:text-surface-300 hover:bg-white/5'}`}
            >
              <Icon size={16} />
              {tab}
              <span className={`ml-1 text-[10px] px-2 py-0.5 rounded-full ${isTabActive ? 'bg-white/10' : 'bg-surface-800'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Trip List */}
      <div className="space-y-4">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 bg-surface-900/50 rounded-3xl animate-pulse border border-white/5" />)
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-[2.5rem]"
          >
            <div className="mb-5 rounded-3xl bg-indigo-500/10 p-6">
              <MapPin size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-black text-slate-200 mb-2">No {active.toLowerCase()} trips</h3>
            <p className="text-slate-400 text-sm mb-8 max-w-xs font-medium">
              Let's plan something exciting!
            </p>
            <Link href="/trips/new">
              <Button variant="gradient" className="rounded-2xl px-8 h-12" icon={<Plus size={16} />}>Plan a Trip</Button>
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((trip: any, i: number) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, x: -16 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }} 
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/trips/${trip.id}`}>
                  <div className="flex items-center gap-6 bg-surface-900/30 backdrop-blur-md rounded-3xl border border-white/5 p-5 cursor-pointer group hover:bg-surface-900/50 hover:border-indigo-500/30 transition-all">
                    {/* Thumbnail */}
                    <div className="h-24 w-40 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-2xl">
                      <img
                        src={trip.coverImage || FALLBACK_IMGS[i % FALLBACK_IMGS.length]}
                        alt={trip.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-xl truncate mb-2 group-hover:text-indigo-400 transition-colors font-display">{trip.title}</h3>
                      <p className="text-surface-400 text-sm flex items-center gap-2 font-medium">
                        <Calendar size={14} className="text-indigo-400" />
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span className="mx-1">→</span>
                        {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="p-3 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                       <ArrowRight size={20} className="text-indigo-400" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
