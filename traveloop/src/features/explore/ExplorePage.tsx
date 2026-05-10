"use client";
// src/features/explore/ExplorePage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Compass, Star, MapPin, Filter, ArrowRight, Heart } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["All", "Beaches", "Mountains", "Cities", "Historical", "Adventure"];

const DESTINATIONS = [
  { id: "1", name: "Amalfi Coast", country: "Italy", img: "https://images.unsplash.com/photo-1633321088392-892f3883b161?w=800&q=80", rating: 4.9, tags: ["Beaches", "Historical"], popular: true },
  { id: "2", name: "Swiss Alps", country: "Switzerland", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", rating: 4.8, tags: ["Mountains", "Adventure"], popular: true },
  { id: "3", name: "Kyoto", country: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", rating: 4.9, tags: ["Cities", "Historical"], popular: true },
  { id: "4", name: "Machu Picchu", country: "Peru", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80", rating: 4.9, tags: ["Historical", "Mountains"], popular: false },
  { id: "5", name: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80", rating: 4.7, tags: ["Beaches", "Adventure"], popular: false },
  { id: "6", name: "Petra", country: "Jordan", img: "https://images.unsplash.com/photo-1579606032822-7f72ebbaee4e?w=800&q=80", rating: 4.8, tags: ["Historical"], popular: false },
];

export function ExplorePage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = DESTINATIONS.filter(d => 
    (activeCat === "All" || d.tags.includes(activeCat)) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Explore the World</h1>
          <p className="text-surface-400">Discover your next adventure from our curated list of stunning destinations.</p>
        </div>
        
        <div className="flex-1 w-full md:max-w-md relative">
          <Input
            placeholder="Search destinations, countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={18} />}
            className="py-3"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 glass rounded-lg text-surface-400 hover:text-surface-100 transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCat === cat 
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                : "glass text-surface-400 hover:text-surface-100 hover:bg-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group cursor-pointer card-premium overflow-hidden"
          >
            <div className="h-60 relative overflow-hidden">
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-8 h-8 rounded-full glass flex items-center justify-center text-white hover:text-red-400 hover:bg-white/20 transition-all">
                  <Heart size={14} />
                </button>
              </div>

              {dest.popular && (
                <div className="absolute top-4 left-4">
                  <Badge variant="primary" className="bg-brand-500/80 backdrop-blur-md text-white border-none">
                    Popular
                  </Badge>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                    <p className="text-sm text-white/70 flex items-center gap-1">
                      <MapPin size={14} /> {dest.country}
                    </p>
                  </div>
                  <div className="glass px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-white">{dest.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <Compass size={48} className="text-surface-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-surface-200 mb-2">No destinations found</h3>
          <p className="text-surface-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
