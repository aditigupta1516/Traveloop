"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Image as ImageIcon, MapPin, Calendar, Lock, Plus, Sparkles, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const ENTRIES = [
  { 
    id: 1, 
    title: "First Day in Tokyo!", 
    date: "Oct 10, 2026", 
    location: "Shinjuku, Tokyo", 
    content: "We finally arrived in Tokyo! The neon lights in Shinjuku are absolutely mesmerizing. We had the most amazing ramen at a tiny corner shop. The energy here is unlike anything I've ever felt before.",
    images: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"],
    private: true
  },
  { 
    id: 2, 
    title: "Quiet morning in Kyoto", 
    date: "Oct 14, 2026", 
    location: "Arashiyama Bamboo Grove", 
    content: "Woke up at 5 AM to beat the crowds at the bamboo grove. It was so peaceful and serene. Hearing the wind rustle through the bamboo is an experience I'll never forget. I spent an hour just sitting there, taking it all in.",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"],
    private: true
  }
];

export function JournalDashboard() {
  return (
    <div className="flex gap-10 max-w-7xl mx-auto py-6">
      
      {/* Left Column: Personal Stats & Search */}
      <div className="hidden lg:block w-72 space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-brand-500/10 border border-brand-500/20">
           <h3 className="text-xs font-black text-brand-400 mb-6 uppercase tracking-widest flex items-center gap-2">
             <BookOpen size={16} /> Journal Stats
           </h3>
           <div className="space-y-6">
              <div>
                <p className="text-3xl font-black text-white font-display">24</p>
                <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">Memories Captured</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white font-display">12</p>
                <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">Cities Explored</p>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] mb-4">Past Memories</h3>
           <div className="relative">
             <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-600" />
             <input type="text" placeholder="Search memories..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:border-brand-500/50 transition-all" />
           </div>
        </div>
      </div>

      {/* Main Journal Feed */}
      <div className="flex-1 space-y-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-5xl font-black text-white font-display leading-tight">My Travel <span className="text-brand-400">Journal</span></h1>
            <p className="text-surface-500 text-sm font-bold mt-2 flex items-center gap-2">
              <Lock size={14} className="text-emerald-500" /> Private memories only visible to you
            </p>
          </div>
          <Button variant="gradient" size="lg" className="rounded-2xl px-8" icon={<Plus size={18} />}>New Memory</Button>
        </div>

        {/* Editor Mockup */}
        <Card className="p-10 rounded-[3rem] bg-surface-900/30 border-white/5 backdrop-blur-3xl shadow-2xl group focus-within:border-brand-500/30 transition-all">
          <div className="flex items-center gap-3 mb-6">
             <Sparkles size={16} className="text-brand-400" />
             <span className="text-[10px] font-black text-surface-500 uppercase tracking-widest">What's on your mind today?</span>
          </div>
          <input 
            type="text" 
            placeholder="Give your memory a title..." 
            className="w-full bg-transparent text-3xl font-black text-surface-50 placeholder-surface-700 outline-none mb-6 font-display"
          />
          <textarea 
            placeholder="Start writing your adventure..." 
            className="w-full h-40 bg-transparent text-lg text-surface-300 placeholder-surface-700 outline-none resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-4">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                <ImageIcon size={16} className="text-brand-400" /> Add Photo
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                <MapPin size={16} className="text-emerald-400" /> Location
              </button>
            </div>
            <Button variant="primary" size="lg" className="rounded-2xl px-10">Save to Diary</Button>
          </div>
        </Card>

        {/* Entry List */}
        <div className="space-y-12">
          {ENTRIES.map((entry, idx) => (
            <motion.div key={entry.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="p-10 rounded-[3.5rem] bg-surface-900/40 border-white/5 hover:border-brand-500/20 transition-all group">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-3 font-display group-hover:text-brand-400 transition-colors">{entry.title}</h3>
                    <div className="flex items-center gap-6 text-[10px] font-black text-surface-500 uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-purple-400" /> {entry.date}</span>
                      <span className="flex items-center gap-2"><MapPin size={14} className="text-emerald-400" /> {entry.location}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-surface-500 hover:text-white cursor-pointer transition-all">
                     <BookOpen size={20} />
                  </div>
                </div>
                
                <p className="text-surface-400 text-lg leading-relaxed mb-10 font-medium">
                  {entry.content}
                </p>

                {/* Images Grid */}
                <div className={`grid gap-4 mb-2 ${entry.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {entry.images.map((img, i) => (
                    <div key={i} className="rounded-[2.5rem] overflow-hidden h-[400px] shadow-2xl relative group/img">
                      <img src={img} alt="Journal memory" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-[2s]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/40 to-transparent" />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
