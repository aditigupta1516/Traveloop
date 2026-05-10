"use client";
// src/features/trips/MyTripsDashboard.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Calendar, Users, ArrowRight, MoreHorizontal, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

const TRIPS = [
  { id: "demo-trip", title: "Japan Autumn Tour", destination: "Tokyo, Japan", date: "Oct 10 - Oct 22, 2026", status: "Ongoing", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", collaborators: 3, progress: 45 },
  { id: 2, title: "Swiss Alps Skiing", destination: "Zermatt, Switzerland", date: "Dec 15 - Dec 22, 2026", status: "Upcoming", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80", collaborators: 2, progress: 10 },
  { id: 3, title: "Bali Retreat", destination: "Ubud, Indonesia", date: "Jun 5 - Jun 19, 2025", status: "Completed", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", collaborators: 4, progress: 100 },
];

export function MyTripsDashboard() {
  const [filter, setFilter] = useState("All");

  const filteredTrips = filter === "All" ? TRIPS : TRIPS.filter(t => t.status === filter);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">My Trips</h1>
          <p className="text-surface-400">Manage all your ongoing, upcoming, and past adventures.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Input placeholder="Search trips..." leftIcon={<Search size={16} />} />
          </div>
          <Link href="/trips/new">
            <Button variant="gradient" className="w-full sm:w-auto">Plan New Trip</Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-surface-900/50 p-1 rounded-xl border border-white/[0.06] w-fit">
        {["All", "Ongoing", "Upcoming", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab
                ? "bg-surface-800 text-brand-400 shadow-sm"
                : "text-surface-400 hover:text-surface-200 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip, idx) => (
          <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Link href={`/trips/${trip.id}`}>
              <Card variant="premium" className="overflow-hidden group cursor-pointer h-full flex flex-col">
                {/* Image Header */}
                <div className="h-48 relative overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    <Badge variant={trip.status === "Ongoing" ? "primary" : trip.status === "Completed" ? "success" : "secondary"} className="shadow-lg backdrop-blur-md bg-black/40">
                      {trip.status}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{trip.title}</h3>
                    <p className="text-sm text-surface-300 flex items-center gap-1.5"><Map size={14} className="text-brand-400" /> {trip.destination}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-surface-400 gap-2">
                      <Calendar size={15} />
                      <span>{trip.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-surface-400 gap-2">
                      <Users size={15} />
                      <span>{trip.collaborators} Collaborators</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-surface-400">
                      <span>Trip Progress</span>
                      <span>{trip.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${trip.progress}%` }} 
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full ${trip.status === "Completed" ? "bg-emerald-500" : "gradient-brand"}`}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
