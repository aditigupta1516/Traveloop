"use client";

import { motion } from "framer-motion";
import { Bell, Check, Trash2, Clock, MapPin, MessageSquare, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/layout/Navbar";
import { useAppStore } from "@/store/useAppStore";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "trip_update",
    title: "Trip Itinerary Updated",
    message: "Alex added 3 new activities to your Euro Trip 2024 itinerary.",
    time: "2 mins ago",
    read: false,
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    id: "2",
    type: "social",
    title: "New Like",
    message: "Sarah and 5 others liked your 'Sunrise in Amalfi' post.",
    time: "45 mins ago",
    read: false,
    icon: Heart,
    color: "bg-pink-500",
  },
  {
    id: "3",
    type: "security",
    title: "Security Alert",
    message: "New login detected from a Chrome browser on Windows.",
    time: "2 hours ago",
    read: true,
    icon: Shield,
    color: "bg-amber-500",
  },
  {
    id: "4",
    type: "social",
    title: "New Comment",
    message: "Mark commented on your budget plan: 'This looks very efficient!'",
    time: "5 hours ago",
    read: true,
    icon: MessageSquare,
    color: "bg-purple-500",
  },
  {
    id: "5",
    type: "system",
    title: "Welcome to Traveloop!",
    message: "Start your journey by creating your first trip and exploring destinations.",
    time: "1 day ago",
    read: true,
    icon: Sparkles,
    color: "bg-brand-500",
  },
];

import { Sparkles } from "lucide-react";

export default function NotificationsPage() {
  const { clearNotifications } = useAppStore();

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Notifications</h1>
            <p className="text-surface-400 mt-1">Stay updated with your trips and community</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon={<Check size={14} />}>
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10" icon={<Trash2 size={14} />}>
              Clear all
            </Button>
          </div>
        </header>

        <div className="space-y-3">
          {NOTIFICATIONS.map((notif, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={notif.id}
              className={`group relative p-4 rounded-2xl transition-all duration-300 border ${
                notif.read 
                  ? "bg-surface-900/40 border-surface-800/50 hover:bg-surface-900/60" 
                  : "bg-surface-900/80 border-brand-500/20 hover:bg-surface-900 shadow-lg shadow-brand-500/5"
              }`}
            >
              {!notif.read && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-brand-500 rounded-full" />
              )}
              
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.color} bg-opacity-20`}>
                  <notif.icon className={notif.color.replace('bg-', 'text-')} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className={`font-semibold text-sm ${notif.read ? "text-surface-200" : "text-white"}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-surface-500 font-medium">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-surface-400 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {NOTIFICATIONS.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-900 flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-surface-600" />
            </div>
            <h3 className="text-lg font-semibold text-surface-200">No notifications</h3>
            <p className="text-surface-500">We'll let you know when something happens.</p>
          </div>
        )}
      </main>
    </div>
  );
}
