"use client";
// src/features/itinerary/MapPreview.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation2, Compass, Layers } from "lucide-react";
import { useTripStore } from "@/store/useAppStore";

export function MapPreview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate map load
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-surface-950 overflow-hidden">
      {/* Fallback/Mock Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80")',
          filter: "grayscale(100%) contrast(120%) brightness(50%)",
          opacity: loading ? 0 : 0.4
        }} 
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(58,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,107,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-2 border-brand-500/20 border-t-brand-500 mb-4"
          />
          <p className="text-sm text-surface-400 animate-pulse">Loading interactive map...</p>
        </div>
      ) : (
        <>
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 glass-strong border border-white/[0.08] rounded-xl flex items-center justify-center text-surface-300 hover:text-surface-100 transition-colors shadow-lg">
              <Compass size={18} />
            </button>
            <button className="w-10 h-10 glass-strong border border-white/[0.08] rounded-xl flex items-center justify-center text-surface-300 hover:text-surface-100 transition-colors shadow-lg">
              <Layers size={18} />
            </button>
          </div>

          {/* Mock Map Route & Pins */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Animated Route Path */}
            <motion.path
              d="M 150 200 Q 250 150 350 250 T 450 100"
              fill="transparent"
              stroke="#3a6bff"
              strokeWidth="3"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>

          {/* Pins */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-[185px] left-[135px] flex flex-col items-center group cursor-pointer"
          >
            <div className="bg-surface-900 border border-white/[0.08] px-2 py-1 rounded-lg text-xs font-semibold mb-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 whitespace-nowrap shadow-xl">
              Shinjuku Hotel
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 relative">
              <MapPin size={16} className="text-white" />
              <div className="absolute inset-0 rounded-full border border-purple-400 animate-ping opacity-20" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute top-[235px] left-[335px] flex flex-col items-center group cursor-pointer"
          >
            <div className="bg-surface-900 border border-white/[0.08] px-2 py-1 rounded-lg text-xs font-semibold mb-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 whitespace-nowrap shadow-xl">
              Senso-ji Temple
            </div>
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/40">
              <span className="text-white font-bold text-sm">1</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="absolute top-[85px] left-[435px] flex flex-col items-center group cursor-pointer"
          >
            <div className="bg-surface-900 border border-white/[0.08] px-2 py-1 rounded-lg text-xs font-semibold mb-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 whitespace-nowrap shadow-xl">
              Sushi Lunch
            </div>
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40">
              <span className="text-white font-bold text-sm">2</span>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
