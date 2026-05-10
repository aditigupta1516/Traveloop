"use client";
// src/features/itinerary/ItineraryBuilder.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, CalendarDays, LayoutList, Share2, Plus, GripVertical, Settings, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Timeline } from "@/features/itinerary/Timeline";
import { MapPreview } from "@/features/itinerary/MapPreview";
import { useTripStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface Props {
  tripId: string;
}

export function ItineraryBuilder({ tripId }: Props) {
  const [view, setView] = useState<"timeline" | "calendar" | "board">("timeline");
  const { mapVisible, toggleMap } = useTripStore();

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -mt-4">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 rounded-xl glass border border-white/[0.06] flex items-center justify-center text-surface-400 hover:text-surface-100 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-surface-50 font-display">Japan Adventure</h1>
              <Badge variant="primary">Upcoming</Badge>
            </div>
            <p className="text-xs text-surface-500 mt-1">Oct 12 — Oct 22, 2026 • 3 Travelers</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-surface-900 border border-surface-800 rounded-xl p-1 mr-2">
            {[
              { id: "timeline", icon: LayoutList, label: "Timeline" },
              { id: "calendar", icon: CalendarDays, label: "Calendar" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id as any)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                  view === v.id ? "bg-surface-800 text-surface-100 shadow-sm" : "text-surface-500 hover:text-surface-300"
                )}
              >
                <v.icon size={14} />
                <span className="hidden sm:inline">{v.label}</span>
              </button>
            ))}
          </div>

          <Button variant="secondary" size="sm" icon={<Users size={14} />} className="hidden sm:flex">Invite</Button>
          <Button variant="secondary" size="sm" icon={<Share2 size={14} />} className="hidden sm:flex">Share</Button>
          
          <Button 
            variant={mapVisible ? "primary" : "outline"} 
            size="sm" 
            icon={<MapIcon size={14} />}
            onClick={toggleMap}
          >
            {mapVisible ? "Hide Map" : "Show Map"}
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden pt-4 gap-6 relative">
        {/* Left Side: Builder */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide pb-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-200">Itinerary</h2>
              <Button variant="gradient" size="xs" icon={<Plus size={14} />}>Add Activity</Button>
            </div>
            
            <Timeline />
          </div>
        </div>

        {/* Right Side: Map */}
        <AnimatePresence>
          {mapVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0, scale: 0.95 }}
              animate={{ width: "40%", opacity: 1, scale: 1 }}
              exit={{ width: 0, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block h-full border border-white/[0.06] rounded-2xl overflow-hidden glass"
            >
              <MapPreview />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
