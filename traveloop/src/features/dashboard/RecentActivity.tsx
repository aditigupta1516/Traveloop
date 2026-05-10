"use client";
// src/features/dashboard/RecentActivity.tsx
import { motion } from "framer-motion";
import { Plus, Map, Users, BookOpen, Star, Activity } from "lucide-react";
import { formatDate } from "@/lib/utils";

const ACTIVITIES = [
  { id: 1, type: "trip_created", icon: Map, message: "Created Japan Adventure", time: new Date(Date.now() - 2 * 3600000), color: "text-brand-400 bg-brand-500/10" },
  { id: 2, type: "collaborator", icon: Users, message: "Alex joined Paris Getaway", time: new Date(Date.now() - 5 * 3600000), color: "text-accent-400 bg-accent-500/10" },
  { id: 3, type: "journal", icon: BookOpen, message: "Added journal entry", time: new Date(Date.now() - 24 * 3600000), color: "text-emerald-400 bg-emerald-500/10" },
  { id: 4, type: "activity", icon: Star, message: "Saved TeamLab Planets", time: new Date(Date.now() - 2 * 86400000), color: "text-amber-400 bg-amber-500/10" },
  { id: 5, type: "trip_created", icon: Plus, message: "Added Bali to itinerary", time: new Date(Date.now() - 3 * 86400000), color: "text-brand-400 bg-brand-500/10" },
];

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function RecentActivity() {
  return (
    <div className="card-premium p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Activity size={17} className="text-brand-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-surface-100">Recent Activity</h3>
          <p className="text-xs text-surface-500">Your latest actions</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-surface-800" />
        <div className="space-y-4">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 pl-8 relative"
            >
              <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                <activity.icon size={11} />
              </div>
              <div>
                <p className="text-xs text-surface-300 font-medium">{activity.message}</p>
                <p className="text-xs text-surface-600 mt-0.5">{timeAgo(activity.time)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
