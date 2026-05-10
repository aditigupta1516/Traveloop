"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { Map, ArrowRight, Calendar, Users, MapPin, Clock } from "lucide-react";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateRange, getDaysUntil } from "@/lib/utils";
import axios from "axios";

const DEMO_TRIPS = [
  {
    id: "1",
    title: "Japan Adventure",
    status: "UPCOMING",
    startDate: new Date(Date.now() + 15 * 86400000),
    endDate: new Date(Date.now() + 22 * 86400000),
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    stops: [{ cityName: "Tokyo" }, { cityName: "Kyoto" }, { cityName: "Osaka" }],
    _count: { collaborators: 3 },
  },
  {
    id: "2",
    title: "Paris Getaway",
    status: "PLANNING",
    startDate: new Date(Date.now() + 45 * 86400000),
    endDate: new Date(Date.now() + 50 * 86400000),
    coverImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    stops: [{ cityName: "Paris" }],
    _count: { collaborators: 1 },
  },
  {
    id: "3",
    title: "Bali & Lombok",
    status: "PLANNING",
    startDate: new Date(Date.now() + 90 * 86400000),
    endDate: new Date(Date.now() + 100 * 86400000),
    coverImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80",
    stops: [{ cityName: "Bali" }, { cityName: "Lombok" }],
    _count: { collaborators: 4 },
  },
];

export function UpcomingTrips() {
  const { data: trips, isLoading } = useQuery({
    queryKey: ["upcoming-trips"],
    queryFn: () => axios.get("/api/trips?status=UPCOMING,PLANNING&limit=3").then((r) => r.data).catch(() => DEMO_TRIPS),
    initialData: DEMO_TRIPS,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-surface-50 font-display flex items-center gap-2">
          <Calendar size={20} className="text-brand-400" /> Upcoming Adventures
        </h2>
        <Link href="/trips">
          <Button variant="ghost" size="sm" className="text-xs font-bold text-surface-500 hover:text-brand-400 uppercase tracking-widest flex items-center gap-2">
            View all <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips?.map((trip: any, i: number) => {
          const daysUntil = getDaysUntil(trip.startDate);
          return (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/trips/${trip.id}`}>
                <div className="relative rounded-[2rem] overflow-hidden bg-surface-900/50 border border-white/5 shadow-xl transition-all duration-300 hover:border-brand-500/20">
                  {/* Image Header */}
                  <div className="h-44 relative overflow-hidden">
                    <img 
                      src={trip.coverImage || "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80"} 
                      alt={trip.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 bg-brand-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-brand-500/40">
                      {trip.status}
                    </div>

                    {/* Days Until Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <Clock size={12} className="text-brand-400" />
                      <span className="text-[11px] font-bold text-white whitespace-nowrap">
                        {daysUntil > 0 ? `${daysUntil} days left` : "Happening Now"}
                      </span>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 font-display truncate group-hover:text-brand-400 transition-colors">
                      {trip.title}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-surface-400 text-xs font-medium">
                        <Calendar size={14} className="text-brand-500" />
                        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-surface-400 text-xs font-medium">
                        <MapPin size={14} className="text-brand-500" />
                        <span className="truncate">{trip.stops?.map((s: any) => s.cityName).join(" → ")}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((u) => (
                          <div key={u} className="w-7 h-7 rounded-full border-2 border-surface-950 bg-surface-800 flex items-center justify-center">
                            <Users size={12} className="text-surface-500" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Details <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
