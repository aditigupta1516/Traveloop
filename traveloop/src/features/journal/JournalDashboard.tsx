"use client";
// src/features/journal/JournalDashboard.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Image as ImageIcon, MapPin, Calendar, Heart, MessageCircle, Share2, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const ENTRIES = [
  { 
    id: 1, 
    title: "First Day in Tokyo!", 
    date: "Oct 10, 2026", 
    location: "Shinjuku, Tokyo", 
    content: "We finally arrived in Tokyo! The neon lights in Shinjuku are absolutely mesmerizing. We had the most amazing ramen at a tiny corner shop.",
    images: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"],
    likes: 12,
    comments: 3
  },
  { 
    id: 2, 
    title: "Quiet morning in Kyoto", 
    date: "Oct 14, 2026", 
    location: "Arashiyama Bamboo Grove", 
    content: "Woke up at 5 AM to beat the crowds at the bamboo grove. It was so peaceful and serene. Hearing the wind rustle through the bamboo is an experience I'll never forget.",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"],
    likes: 24,
    comments: 5
  }
];

export function JournalDashboard() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Travel Journal</h1>
          <p className="text-surface-400">Document your adventures, thoughts, and best photos.</p>
        </div>
        <Button variant="gradient" icon={<Plus size={16} />}>New Entry</Button>
      </div>

      {/* Editor Mockup */}
      <Card className="p-6 bg-surface-900/50 border border-white/[0.06]">
        <input 
          type="text" 
          placeholder="Give your memory a title..." 
          className="w-full bg-transparent text-2xl font-bold text-surface-50 placeholder-surface-600 outline-none mb-4"
        />
        <textarea 
          placeholder="Write about your day..." 
          className="w-full h-32 bg-transparent text-surface-300 placeholder-surface-600 outline-none resize-none"
        />
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-4">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon={<ImageIcon size={16} />}>Add Photo</Button>
            <Button variant="secondary" size="sm" icon={<MapPin size={16} />}>Tag Location</Button>
          </div>
          <Button variant="primary" size="sm">Save Entry</Button>
        </div>
      </Card>

      {/* Feed */}
      <div className="space-y-8">
        {ENTRIES.map((entry, idx) => (
          <motion.div key={entry.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-surface-50 mb-1">{entry.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-surface-400">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {entry.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {entry.location}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              
              <p className="text-surface-300 leading-relaxed mb-6">
                {entry.content}
              </p>

              {/* Images Grid */}
              <div className={`grid gap-2 mb-6 ${entry.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {entry.images.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden h-64">
                    <img src={img} alt="Journal memory" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6 border-t border-white/[0.04] pt-4">
                <button className="flex items-center gap-2 text-surface-400 hover:text-brand-400 transition-colors">
                  <Heart size={18} /> <span>{entry.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-surface-400 hover:text-brand-400 transition-colors">
                  <MessageCircle size={18} /> <span>{entry.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-surface-400 hover:text-brand-400 transition-colors ml-auto">
                  <Share2 size={18} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
