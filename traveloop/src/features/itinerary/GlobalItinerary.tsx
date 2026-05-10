"use client";
// src/features/itinerary/GlobalItinerary.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, MapPin, Building, Plane, Clock, DollarSign, GripVertical, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function GlobalItinerary() {
  const [activeTab, setActiveTab] = useState("Activities");

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Build Itinerary</h1>
          <p className="text-surface-400">Organize your travel, accommodations, and activities.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<Calendar size={16} />}>Date Range</Button>
          <Button variant="secondary" icon={<DollarSign size={16} />}>Budget</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-900/50 p-1 rounded-xl border border-white/[0.06] w-fit">
        {["Travel", "Hotels", "Activities"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                : "text-surface-400 hover:text-surface-200 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-surface-900/30 border border-white/[0.04] rounded-2xl p-6 min-h-[400px]">
        
        {activeTab === "Activities" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-surface-100 flex items-center gap-2"><MapPin size={20} className="text-brand-400" /> Day 1 - Oct 10</h2>
              <Button variant="secondary" size="sm" icon={<Plus size={16} />}>Add Activity</Button>
            </div>

            {/* Modular Items */}
            <Card className="p-4 flex items-center gap-4 group cursor-pointer hover:border-brand-500/30 transition-colors">
              <GripVertical size={20} className="text-surface-600 group-hover:text-surface-400" />
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" alt="Museum" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-surface-100">TeamLab Planets TOKYO</h3>
                <div className="flex items-center gap-4 text-sm text-surface-400 mt-1">
                  <span className="flex items-center gap-1"><Clock size={14} /> 10:00 AM - 1:00 PM</span>
                  <span className="flex items-center gap-1"><DollarSign size={14} /> $32.00</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" icon={<ChevronDown size={16} />}>Details</Button>
            </Card>

            <Card className="p-4 flex items-center gap-4 group cursor-pointer hover:border-brand-500/30 transition-colors">
              <GripVertical size={20} className="text-surface-600 group-hover:text-surface-400" />
              <div className="w-16 h-16 rounded-xl bg-surface-800 flex items-center justify-center flex-shrink-0 text-amber-400">
                <MapPin size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-surface-100">Tsukiji Outer Market</h3>
                <div className="flex items-center gap-4 text-sm text-surface-400 mt-1">
                  <span className="flex items-center gap-1"><Clock size={14} /> 1:30 PM - 3:00 PM</span>
                  <span className="flex items-center gap-1"><DollarSign size={14} /> $50.00 (Est)</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" icon={<ChevronDown size={16} />}>Details</Button>
            </Card>
          </div>
        )}

        {activeTab === "Hotels" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-surface-100 flex items-center gap-2"><Building size={20} className="text-brand-400" /> Accommodations</h2>
              <Button variant="secondary" size="sm" icon={<Plus size={16} />}>Add Hotel</Button>
            </div>
            <Card className="p-4 flex items-center gap-4 group cursor-pointer hover:border-brand-500/30 transition-colors">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" alt="Hotel" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-surface-100">Shinjuku Prince Hotel</h3>
                  <Badge variant="primary">Confirmed</Badge>
                </div>
                <p className="text-sm text-surface-400 mt-1">Check-in: Oct 10, 3:00 PM • Check-out: Oct 15, 11:00 AM</p>
                <p className="text-sm text-surface-500 mt-1">1-30-1 Kabukicho, Shinjuku City, Tokyo</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "Travel" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-surface-100 flex items-center gap-2"><Plane size={20} className="text-brand-400" /> Flights & Transit</h2>
              <Button variant="secondary" size="sm" icon={<Plus size={16} />}>Add Flight</Button>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <h3 className="text-3xl font-display font-bold text-surface-50">JFK</h3>
                  <p className="text-sm text-surface-400">New York</p>
                  <p className="text-xs text-surface-500 mt-1">Oct 9, 11:30 AM</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-8 relative">
                  <span className="text-xs text-surface-400 mb-2">14h 20m • Direct</span>
                  <div className="w-full h-[1px] border-t-2 border-dashed border-surface-600 relative">
                    <Plane size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-400" />
                  </div>
                  <span className="text-xs text-surface-500 mt-2">ANA Flight 109</span>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-display font-bold text-surface-50">HND</h3>
                  <p className="text-sm text-surface-400">Tokyo</p>
                  <p className="text-xs text-surface-500 mt-1">Oct 10, 2:50 PM</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
