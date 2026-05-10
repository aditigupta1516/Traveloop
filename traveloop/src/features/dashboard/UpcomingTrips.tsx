"use client";
// src/features/dashboard/UpcomingTrips.tsx
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { Map, ArrowRight, Calendar, Users, MapPin } from "lucide-react";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { TripStatusBadge } from "@/components/ui/Badge";
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
    <div className="card-premium p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-surface-100">Upcoming Trips</h3>
          <p className="text-xs text-surface-500 mt-0.5">Your next adventures</p>
        </div>
        <Link href="/trips">
          <Button variant="ghost" size="xs" iconRight={<ArrowRight size={13} />}>View all</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {trips?.map((trip: any, i: number) => {
          const daysUntil = getDaysUntil(trip.startDate);
          return (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/trips/${trip.id}`}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-surface-200 truncate">{trip.title}</p>
                      <TripStatusBadge status={trip.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-surface-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDateRange(trip.startDate, trip.endDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {trip.stops?.map((s: any) => s.cityName).join(" → ")}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {daysUntil > 0 ? (
                      <>
                        <p className="text-lg font-bold text-brand-400 font-display">{daysUntil}</p>
                        <p className="text-xs text-surface-500">days</p>
                      </>
                    ) : (
                      <span className="text-xs text-emerald-400 font-medium">Now</span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {(!trips || trips.length === 0) && (
        <div className="text-center py-8">
          <Map size={32} className="text-surface-700 mx-auto mb-3" />
          <p className="text-sm text-surface-500">No upcoming trips yet</p>
          <Link href="/trips/new">
            <Button variant="primary" size="sm" className="mt-3" icon={<Map size={14} />}>Create Trip</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
