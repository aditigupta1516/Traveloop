"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, TrendingUp, DollarSign, Plus, X, Filter, Globe, Navigation } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const CITIES = [
  { id: 1, name: "Tokyo", country: "Japan", region: "Asia", cost: 4, popularity: 98, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" },
  { id: 2, name: "Paris", country: "France", region: "Europe", cost: 5, popularity: 99, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
  { id: 3, name: "New York", country: "USA", region: "Americas", cost: 5, popularity: 95, img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80" },
  { id: 4, name: "Bali", country: "Indonesia", region: "Asia", cost: 2, popularity: 92, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
  { id: 5, name: "Rome", country: "Italy", region: "Europe", cost: 4, popularity: 94, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80" },
  { id: 6, name: "Dubai", country: "UAE", region: "Middle East", cost: 5, popularity: 90, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { id: 7, name: "London", country: "UK", region: "Europe", cost: 5, popularity: 96, img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
  { id: 8, name: "Bangkok", country: "Thailand", region: "Asia", cost: 2, popularity: 93, img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80" },
];

export function CitySearch({ onAdd }: { onAdd: (city: any) => void }) {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered = CITIES.filter(c => 
    (activeRegion === "All" || c.region === activeRegion) &&
    (c.name.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase()))
  );

  const regions = ["All", ...new Set(CITIES.map(c => c.region))];

  return (
    <div className="flex flex-col h-full bg-surface-950 border-l border-white/5 w-[450px] shadow-2xl">
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-2xl font-black font-display mb-2 flex items-center gap-3">
            <Globe className="text-brand-400" size={24} /> Discover Cities
          </h3>
          <p className="text-surface-500 text-xs font-bold uppercase tracking-widest">Find your next destination</p>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-surface-500 group-focus-within:text-brand-400 transition-colors" size={20} />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or country..."
            className="pl-14 h-16 bg-surface-900 border-white/5 rounded-2xl focus:border-brand-500/50 text-white font-bold"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeRegion === region 
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                  : "bg-surface-900 text-surface-500 hover:text-white hover:bg-surface-800"
              )}
            >
              {region}
            </button>
          ))}
        </div>

        {/* City List */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-400px)] pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filtered.map((city) => (
              <motion.div
                key={city.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group p-5 rounded-[2rem] bg-surface-900/50 border border-white/5 hover:border-brand-500/30 transition-all shadow-xl"
              >
                <div className="flex gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl shrink-0">
                    <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black text-white truncate mb-1">{city.name}</h4>
                    <div className="flex items-center gap-2 text-surface-500 mb-3">
                      <MapPin size={12} className="text-brand-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest truncate">{city.country}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-1.5">
                          <TrendingUp size={12} className="text-emerald-400" />
                          <span className="text-[10px] font-black text-white">{city.popularity}%</span>
                       </div>
                       <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <DollarSign key={i} size={10} className={i < city.cost ? "text-brand-400" : "text-surface-700"} />
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onAdd(city)}
                  variant="primary" 
                  className="w-full mt-4 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-500/10"
                >
                  <Plus size={16} className="mr-2" /> Add to Trip
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filtered.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-surface-900 flex items-center justify-center mx-auto text-surface-700">
                  <Search size={32} />
               </div>
               <p className="text-surface-500 font-bold uppercase tracking-widest text-[10px]">No cities found</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto p-8 border-t border-white/5 bg-white/[0.01]">
         <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
            <Navigation size={18} className="text-indigo-400" />
            <p className="text-[9px] font-bold text-indigo-300 leading-relaxed uppercase tracking-widest">
               Adding a city will auto-generate a 3-day baseline itinerary for you.
            </p>
         </div>
      </div>
    </div>
  );
}
