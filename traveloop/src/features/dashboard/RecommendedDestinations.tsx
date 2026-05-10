"use client";
// src/features/dashboard/RecommendedDestinations.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Star, TrendingUp, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";

const DESTINATIONS = [
  { id: "1", name: "Kyoto", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", rating: 4.9, avgCost: 120, tag: "Trending", tagColor: "primary" as const },
  { id: "2", name: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", rating: 4.8, avgCost: 180, tag: "Popular", tagColor: "purple" as const },
  { id: "3", name: "Queenstown", country: "New Zealand", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", rating: 4.7, avgCost: 150, tag: "Adventure", tagColor: "success" as const },
  { id: "4", name: "Marrakech", country: "Morocco", image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=400&q=80", rating: 4.6, avgCost: 80, tag: "Hidden Gem", tagColor: "warning" as const },
];

export function RecommendedDestinations() {
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSaved = (id: string) =>
    setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <div className="card-premium p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-surface-100 flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-400" />
            Recommended
          </h3>
          <p className="text-xs text-surface-500 mt-0.5">Destinations curated for you</p>
        </div>
        <Link href="/explore">
          <Button variant="ghost" size="xs" iconRight={<ArrowRight size={13} />}>See all</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="group relative"
          >
            <Link href={`/destinations/${dest.id}`}>
              <div className="rounded-xl overflow-hidden aspect-[3/4] relative cursor-pointer">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <Badge variant={dest.tagColor} className="text-xs">{dest.tag}</Badge>
                </div>

                {/* Save Button */}
                <button
                  onClick={(e) => { e.preventDefault(); toggleSaved(dest.id); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full glass flex items-center justify-center transition-all hover:scale-110"
                >
                  <Heart size={13} className={saved.includes(dest.id) ? "text-red-400 fill-red-400" : "text-white"} />
                </button>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-bold text-white">{dest.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-white/70 flex items-center gap-0.5">
                      <MapPin size={10} />{dest.country}
                    </span>
                    <span className="text-xs text-white/70 flex items-center gap-0.5">
                      <Star size={10} className="fill-amber-400 text-amber-400" />{dest.rating}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">~${dest.avgCost}/day</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
