"use client";
// src/features/discover/DiscoverDashboard.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, MapPin, Star, Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const DISCOVER_ITEMS = [
  { id: 1, title: "TeamLab Planets TOKYO", location: "Tokyo, Japan", description: "Immersive art exhibition where you walk through water and a garden where you become one with the flowers.", category: "Museum", rating: 4.9, reviews: 1240, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { id: 2, title: "Eiffel Tower Summit Access", location: "Paris, France", description: "Skip-the-line ticket to the summit of the Eiffel Tower with a local guide. Unbeatable views of Paris.", category: "Landmark", rating: 4.8, reviews: 8530, image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80" },
  { id: 3, title: "Santorini Catamaran Cruise", location: "Santorini, Greece", description: "Sail around Santorini's caldera, visit hot springs, and enjoy a full Greek BBQ dinner on board.", category: "Tour", rating: 4.9, reviews: 342, image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80" },
  { id: 4, title: "Colosseum Underground Tour", location: "Rome, Italy", description: "Exclusive access to the Colosseum dungeons and arena floor. See where the gladiators prepared.", category: "History", rating: 4.7, reviews: 5120, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80" },
];

export function DiscoverDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Discover Activities</h1>
        <p className="text-surface-400">Search for the best tours, landmarks, and experiences around the world.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search by city or activity name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} className="text-surface-400" />}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<Filter size={16} />}>Group by</Button>
          <Button variant="secondary" icon={<SlidersHorizontal size={16} />}>Filter</Button>
        </div>
      </div>

      {/* List Results */}
      <div className="space-y-4">
        {DISCOVER_ITEMS.map((item, idx) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="overflow-hidden group hover:border-brand-500/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-brand-400 hover:bg-black/60 transition-colors">
                    <Heart size={16} />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="primary" className="backdrop-blur-md bg-brand-500/80">{item.category}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-surface-50 group-hover:text-brand-400 transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md text-sm font-medium">
                        <Star size={14} className="fill-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-surface-500 text-xs ml-1">({item.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-sm text-surface-400 mb-3">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                    
                    <p className="text-surface-300 text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button variant="secondary" size="sm">Add to Trip</Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
