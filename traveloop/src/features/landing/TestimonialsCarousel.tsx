"use client";
// src/features/landing/TestimonialsCarousel.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  { id: 1, name: "Sarah Chen", role: "Digital Nomad", avatar: "SC", rating: 5, text: "Traveloop completely transformed how I plan my trips. The AI itinerary builder saved me hours — it felt like having a personal travel concierge!", location: "Tokyo → Bali" },
  { id: 2, name: "Marcus Rivera", role: "Travel Blogger", avatar: "MR", rating: 5, text: "The collaborative trip planning feature is a game-changer. My whole group was on the same page without the endless WhatsApp threads.", location: "Europe Trip" },
  { id: 3, name: "Priya Sharma", role: "Adventure Seeker", avatar: "PS", rating: 5, text: "Budget tracking with Traveloop is phenomenal. I always overspent before — now I can see exactly where every dollar goes in real-time.", location: "South America" },
  { id: 4, name: "James Mitchell", role: "Family Traveler", avatar: "JM", rating: 5, text: "Planning family vacations used to be a nightmare. Traveloop made it fun. The packing lists and itinerary builder are brilliant.", location: "Costa Rica" },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass border border-white/[0.08] rounded-3xl p-8 md:p-12 max-w-2xl mx-auto text-center"
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-surface-200 mb-8 leading-relaxed italic">
              &ldquo;{TESTIMONIALS[current].text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-sm">
                {TESTIMONIALS[current].avatar}
              </div>
              <div className="text-left">
                <p className="font-semibold text-surface-100">{TESTIMONIALS[current].name}</p>
                <p className="text-sm text-surface-500">{TESTIMONIALS[current].role} · {TESTIMONIALS[current].location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="p-2 rounded-xl glass border border-white/[0.08] text-surface-400 hover:text-surface-200 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-brand-400 w-6" : "bg-surface-700"}`}
          />
        ))}
        <button
          onClick={() => setCurrent((c) => (c + 1) % TESTIMONIALS.length)}
          className="p-2 rounded-xl glass border border-white/[0.08] text-surface-400 hover:text-surface-200 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
