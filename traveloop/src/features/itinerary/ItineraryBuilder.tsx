"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Calendar, DollarSign, Clock, Star, 
  LayoutList, Map as MapIcon, Plus, Book, 
  Check, ArrowLeft, MoreHorizontal, Zap,
  Compass, Search, Filter, Sparkles, Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const CITY_DATA: any = {
  "Tokyo": {
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80',
    suggestions: [
      { id: 's1', title: 'Senso-ji Temple', category: 'Sightseeing', duration: '2h', rating: 4.9, price: 0, image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80' },
      { id: 's2', title: 'Tsukiji Fish Market', category: 'Food', duration: '3h', rating: 4.7, price: 35, image: 'https://images.unsplash.com/photo-1552089123-2d26226fc2b7?w=400&q=80' },
      { id: 's3', title: 'Shibuya Crossing', category: 'Landmark', duration: '1h', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80' },
    ]
  },
  "Paris": {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
    suggestions: [
      { id: 'p1', title: 'Eiffel Tower Tour', category: 'Landmark', duration: '2.5h', rating: 4.9, price: 25, image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee87?w=400&q=80' },
      { id: 'p2', title: 'Louvre Museum', category: 'Art', duration: '4h', rating: 4.8, price: 17, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80' },
      { id: 'p3', title: 'Seine River Cruise', category: 'Experience', duration: '1h', rating: 4.6, price: 15, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
    ]
  },
  "Bali": {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80',
    suggestions: [
      { id: 'b1', title: 'Uluwatu Temple', category: 'Spiritual', duration: '2h', rating: 4.8, price: 10, image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&q=80' },
      { id: 'b2', title: 'Tegalalang Rice Terrace', category: 'Nature', duration: '3h', rating: 4.9, price: 5, image: 'https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=400&q=80' },
      { id: 'b3', title: 'Monkey Forest Sanctuary', category: 'Wildlife', duration: '2h', rating: 4.7, price: 8, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80' },
    ]
  },
  "Rome": {
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80',
    suggestions: [
      { id: 'r1', title: 'Colosseum Tour', category: 'History', duration: '3h', rating: 4.9, price: 30, image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=80' },
      { id: 'r2', title: 'Vatican Museums', category: 'Art', duration: '4h', rating: 4.8, price: 25, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&q=80' },
      { id: 'r3', title: 'Trevi Fountain', category: 'Landmark', duration: '1h', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1515542641795-85edde8a632a?w=400&q=80' },
    ]
  },
  "New York": {
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&q=80',
    suggestions: [
      { id: 'n1', title: 'Empire State Building', category: 'Landmark', duration: '2h', rating: 4.8, price: 42, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&q=80' },
      { id: 'n2', title: 'Central Park Walk', category: 'Nature', duration: '3h', rating: 4.9, price: 0, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
      { id: 'n3', title: 'Times Square', category: 'Culture', duration: '1.5h', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
    ]
  }
};

import { ChevronDown, GripVertical, Hotel, Plane, Settings2, Trash2 } from "lucide-react";

import { CitySearch } from "@/features/destinations/CitySearch";

export function ItineraryBuilder({ tripId }: { tripId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"travel" | "hotels" | "activities">("activities");
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [budget, setBudget] = useState(2500);
  const [spent, setSpent] = useState(480);
  const [isExpanded, setIsExpanded] = useState<string | null>("s1");

  const { data: trip, isLoading } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => axios.get(`/api/user-trips`).then(r => r.data.find((t: any) => t.id === tripId) || r.data[0]),
  });

  if (isLoading) return <div className="min-h-screen bg-surface-950 flex items-center justify-center"><Zap className="animate-spin text-brand-400" /></div>;

  const tripTitle = trip?.title?.toLowerCase() || "";
  let city = trip?.title || "Tokyo";
  
  const cityKey = Object.keys(CITY_DATA).find(k => tripTitle.includes(k.toLowerCase())) || "Tokyo";
  const cityInfo = CITY_DATA[cityKey];

  const TABS = [
    { id: "travel", label: "Travel", icon: Plane },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "activities", label: "Activities", icon: Sparkles },
  ];

    const handleDeleteTrip = async () => {
      if (confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
        try {
          await axios.delete(`/api/user-trips/${tripId}`);
          toast.success("Trip deleted successfully");
          router.push("/dashboard");
        } catch (err) {
          toast.error("Failed to delete trip");
        }
      }
    };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* ── Header ───────────────────────────────────── */}
        <header className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black font-display tracking-tight mb-2">Build Itinerary</h1>
            <p className="text-surface-500 font-medium">Organize your travel, accommodations, and activities for {city}.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" className="bg-surface-900/50 border-white/5 rounded-2xl h-12 px-6 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Calendar size={16} /> Date Range
            </Button>
            <Button 
              onClick={() => setShowBudgetModal(true)}
              variant="secondary" className="bg-surface-900/50 border-white/5 rounded-2xl h-12 px-6 text-xs font-black uppercase tracking-widest flex items-center gap-2"
            >
              <DollarSign size={16} /> Budget
            </Button>
            <Button 
              onClick={handleDeleteTrip}
              variant="secondary" className="bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl h-12 px-6 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all"
            >
              <Trash2 size={16} /> Delete Trip
            </Button>
          </div>
        </header>

        {/* ── Tabs & Discovery ────────────────────────── */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex bg-surface-900/30 p-1.5 rounded-2xl border border-white/5 w-fit">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  activeTab === tab.id ? "bg-[#1a1f2e] text-brand-400 shadow-xl border border-brand-500/20" : "text-surface-500 hover:text-white"
                )}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          <Button 
            onClick={() => setShowCitySearch(!showCitySearch)}
            variant="secondary" 
            className={cn(
              "h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all",
              showCitySearch ? "bg-brand-500 text-white border-brand-400" : "bg-surface-900/30 text-surface-400 hover:text-white"
            )}
          >
            <Globe size={16} className="mr-2" /> {showCitySearch ? "Close Discovery" : "Discover Cities"}
          </Button>
        </div>

        <div className="flex gap-12 relative items-start">
          {/* ── Day Sections ───────────────────────────── */}
          <div className="flex-1 space-y-16">
            {[1, 2, 3].map(dayNum => (
              <section key={dayNum} className="bg-surface-900/10 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
                      {dayNum}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black font-display tracking-tight">Day {dayNum} - Oct {10 + dayNum - 1}</h2>
                      <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mt-1">Exploration Phase</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-white/5 border-white/10 rounded-xl h-10 text-[10px] font-black uppercase tracking-widest px-5 hover:bg-white/10 transition-all">
                    <Plus size={14} className="mr-2" /> Add Activity
                  </Button>
                </div>

                <div className="p-8 space-y-4">
                  {(dayNum === 1 ? cityInfo.suggestions : cityInfo.suggestions.slice(1).concat(cityInfo.suggestions[0])).map((act: any, idx: number) => (
                    <div key={`${dayNum}-${act.id}`} className="group flex flex-col bg-surface-900/40 hover:bg-surface-900/60 border border-white/5 rounded-3xl transition-all shadow-lg">
                      <div className="flex items-center p-6">
                        <div className="p-3 text-surface-600 hover:text-white cursor-grab active:cursor-grabbing">
                           <GripVertical size={20} />
                        </div>
                        
                        <div className="w-20 h-20 rounded-2xl overflow-hidden ml-2 shadow-2xl shrink-0">
                           {act.image ? (
                             <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           ) : (
                             <div className="w-full h-full bg-surface-800 flex items-center justify-center text-brand-400"><MapPin size={24} /></div>
                           )}
                        </div>

                        <div className="flex-1 px-8">
                           <h3 className="text-xl font-black text-white mb-1 group-hover:text-brand-400 transition-colors font-display tracking-tight">{act.title}</h3>
                           <div className="flex items-center gap-4 text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-400" /> {idx === 0 ? "10:00 AM" : "2:30 PM"}</span>
                              <span className="text-surface-700 mx-1">•</span>
                              <span className="flex items-center gap-1.5"><DollarSign size={12} className="text-emerald-400" /> ${act.price}.00</span>
                           </div>
                        </div>

                        <button 
                          onClick={() => setIsExpanded(isExpanded === `${dayNum}-${act.id}` ? null : `${dayNum}-${act.id}`)}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-surface-500 hover:text-white transition-all px-4"
                        >
                          <ChevronDown size={14} className={cn("transition-transform duration-300", isExpanded === `${dayNum}-${act.id}` && "rotate-180")} /> Details
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {isExpanded === `${dayNum}-${act.id}` && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-20 pb-8 pt-2 text-surface-400 text-sm leading-relaxed border-t border-white/5 mt-2 bg-white/[0.01]">
                               This is a highly rated {act.category.toLowerCase()} experience in {city}. It typically takes {act.duration} to fully explore. 
                               Recommended for travelers looking for {act.category === 'Sightseeing' ? 'historical depth' : 'modern culture'}.
                               <div className="flex gap-4 mt-6">
                                  <Button variant="secondary" size="sm" className="bg-white/5 rounded-xl border-white/10 text-[9px] uppercase font-black tracking-widest hover:bg-white/10">Add Note</Button>
                                  <Button variant="secondary" size="sm" className="bg-rose-500/10 border-rose-500/20 text-rose-500 rounded-xl text-[9px] uppercase font-black tracking-widest hover:bg-rose-500 hover:text-white transition-all">Remove</Button>
                               </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ── City Discovery Sidebar ──────────────────── */}
          <AnimatePresence>
            {showCitySearch && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="sticky top-12 shrink-0 h-[calc(100vh-200px)]"
              >
                <CitySearch onAdd={(city) => {
                  toast.success(`Added ${city.name} to your journey! 🌍`);
                  setShowCitySearch(false);
                }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Floating Budget Panel ───────────────────── */}
        <div className="fixed bottom-10 right-10 z-50">
           <Card className="p-6 bg-surface-900/80 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] w-80">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-[10px] font-black text-surface-500 uppercase tracking-widest">Budget Overview</span>
                 <Settings2 size={14} className="text-surface-600 hover:text-white cursor-pointer" onClick={() => setShowBudgetModal(true)} />
              </div>
              <div className="flex items-baseline justify-between mb-4">
                 <span className="text-3xl font-black text-white font-display">${spent}</span>
                 <span className="text-surface-500 text-xs font-bold">/ ${budget}</span>
              </div>
              <Progress value={(spent / budget) * 100} className="h-3 bg-white/5 rounded-full" />
           </Card>
        </div>

        {/* ── Budget Modal ────────────────────────────── */}
        <AnimatePresence>
          {showBudgetModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                 onClick={() => setShowBudgetModal(false)}
               />
               <motion.div 
                 initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                 className="relative w-full max-w-md bg-surface-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl"
               >
                 <h2 className="text-3xl font-black font-display mb-2">Manage Budget</h2>
                 <p className="text-surface-500 text-sm mb-8">Set your total budget for the {city} trip.</p>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] block">Total Trip Budget ($)</label>
                       <input 
                         type="number" 
                         value={budget} 
                         onChange={(e) => setBudget(Number(e.target.value))}
                         className="w-full bg-surface-950 border border-white/5 rounded-2xl h-16 px-6 text-2xl font-black text-white outline-none focus:border-brand-500/50 transition-all"
                       />
                    </div>
                    <Button 
                      onClick={() => setShowBudgetModal(false)}
                      variant="primary" className="w-full h-14 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-500/20"
                    >
                      Update Budget
                    </Button>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
