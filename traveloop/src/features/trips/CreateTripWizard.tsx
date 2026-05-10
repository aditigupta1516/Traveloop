"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Image as ImageIcon, Globe, Lock, Users, ArrowLeft, ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const COVER_SUGGESTIONS = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
];

const VISIBILITY_OPTIONS = [
  { value: 'PRIVATE', icon: Lock,  label: 'Private', desc: 'Only you can see this' },
  { value: 'FRIENDS', icon: Users, label: 'Collaborative', desc: 'Invite friends to edit' },
  { value: 'PUBLIC',  icon: Globe, label: 'Public',  desc: 'Visible to everyone' },
];

const STATUS_OPTIONS = [
  { value: 'PLANNING',   label: '📅 Planned',   color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { value: 'ONGOING',   label: '🚀 Ongoing',   color: 'text-brand-400', bg: 'bg-brand-500/10' },
  { value: 'COMPLETED', label: '✅ Completed',  color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const TRENDING_DESTINATIONS = [
  { name: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80', badge: 'Trending' },
  { name: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', badge: 'Relaxing' },
  { name: 'Paris, France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', badge: 'Romantic' },
  { name: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80', badge: 'Adventure' },
];

export function CreateTripWizard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '', notes: '', startDate: '', endDate: '',
    coverImage: '', visibility: 'PRIVATE', status: 'PLANNING'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startDate || !formData.endDate) {
      return toast.error("Please fill in all required fields");
    }
    
    setLoading(true);
    try {
      const res = await axios.post('/api/user-trips', formData);
      toast.success("Trip created successfully! ✨");
      router.push(`/trips/${res.data.id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <button onClick={() => router.back()}
            className="p-3 rounded-2xl text-surface-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all border border-white/5">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-4xl font-black text-white font-display">Plan a New <span className="text-brand-400">Trip</span></h1>
            <p className="text-surface-500 text-sm font-medium mt-1">Set the foundation for your next great journey</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Core Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Trip Name & Description */}
          <div className="p-8 rounded-[2.5rem] bg-surface-900/40 backdrop-blur-md border border-white/5 shadow-xl space-y-6">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-black text-surface-500 uppercase tracking-[0.2em]">
                <MapPin size={14} className="text-brand-400" /> Trip Name *
              </label>
              <Input
                name="title" 
                required 
                value={formData.title} 
                onChange={handleChange}
                placeholder="e.g. Summer in Tokyo, Backpacking Europe..."
                className="text-xl font-bold bg-surface-950/50 border-white/5 h-16 rounded-2xl focus:border-brand-500/50"
              />

              {/* Destination Suggestions */}
              <div className="pt-4">
                <p className="text-[10px] font-black text-surface-600 uppercase tracking-widest mb-4">Suggested Destinations</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TRENDING_DESTINATIONS.map((dest) => (
                    <button
                      key={dest.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, title: `Trip to ${dest.name.split(',')[0]}`, coverImage: dest.img })}
                      className="group relative h-24 rounded-2xl overflow-hidden border border-white/5 transition-all hover:border-brand-500/50"
                    >
                      <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-left">
                        <p className="text-[10px] font-bold text-white truncate">{dest.name}</p>
                        <p className="text-[8px] font-black text-brand-400 uppercase tracking-widest">{dest.badge}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="flex items-center gap-2 text-xs font-black text-surface-500 uppercase tracking-[0.2em]">
                Notes (optional)
              </label>
              <Textarea 
                name="notes" 
                rows={4} 
                value={formData.notes} 
                onChange={handleChange}
                placeholder="What is this trip about? Any specific goals or highlights..."
                className="bg-surface-950/50 border-white/5 rounded-2xl resize-none focus:border-brand-500/50"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="p-8 rounded-[2.5rem] bg-surface-900/40 backdrop-blur-md border border-white/5 shadow-xl">
            <label className="flex items-center gap-2 text-xs font-black text-surface-500 uppercase tracking-[0.2em] mb-8">
              <Calendar size={14} className="text-accent-400" /> Trip Timeline *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-surface-600 uppercase tracking-widest block px-1">Start Date</label>
                <Input type="date" name="startDate" required value={formData.startDate} onChange={handleChange}
                  className="bg-surface-950/50 border-white/5 h-14 rounded-xl focus:border-accent-500/50" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-surface-600 uppercase tracking-widest block px-1">End Date</label>
                <Input type="date" name="endDate" required value={formData.endDate} onChange={handleChange}
                  className="bg-surface-950/50 border-white/5 h-14 rounded-xl focus:border-accent-500/50" />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="p-8 rounded-[2.5rem] bg-surface-900/40 backdrop-blur-md border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 text-xs font-black text-surface-500 uppercase tracking-[0.2em]">
                <ImageIcon size={14} className="text-sky-400" /> Visual Identity
              </label>
              <span className="text-[10px] text-surface-600 font-bold uppercase tracking-widest">Optional</span>
            </div>
            
            <Input type="url" name="coverImage" value={formData.coverImage} onChange={handleChange}
              placeholder="Paste a custom image URL..." className="bg-surface-950/50 border-white/5 h-14 rounded-xl mb-8 focus:border-sky-500/50" />

            <p className="text-[10px] font-black text-surface-600 uppercase tracking-widest mb-4">Curated suggestions:</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {COVER_SUGGESTIONS.map((img, i) => (
                <button 
                  key={i} 
                  type="button" 
                  onClick={() => setFormData({ ...formData, coverImage: img })}
                  className={cn(
                    "relative h-16 rounded-xl overflow-hidden border-2 transition-all",
                    formData.coverImage === img 
                      ? "border-brand-500 shadow-lg shadow-brand-500/40 scale-105" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {formData.coverImage === img && (
                    <div className="absolute inset-0 bg-brand-500/20 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {formData.coverImage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 h-48 rounded-[2rem] overflow-hidden border border-white/10"
              >
                <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Settings & Submit */}
        <div className="space-y-8">
          
          {/* Visibility & Status */}
          <div className="p-8 rounded-[2.5rem] bg-surface-900/40 backdrop-blur-md border border-white/5 shadow-xl space-y-10">
            {/* Status */}
            <div className="space-y-6">
              <label className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] block px-1">Trip Status</label>
              <div className="grid grid-cols-1 gap-2">
                {STATUS_OPTIONS.map(({ value, label, color, bg }) => {
                  const isSelected = formData.status === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: value })}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 font-bold text-sm",
                        isSelected 
                          ? `border-brand-500/50 ${bg} ${color}` 
                          : "border-white/5 text-surface-500 hover:border-white/10 hover:bg-white/5"
                      )}
                    >
                      {label}
                      {isSelected && <Check size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visibility */}
            <div className="space-y-6">
              <label className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] block px-1">Visibility Setting</label>
              <div className="grid grid-cols-1 gap-3">
                {VISIBILITY_OPTIONS.map(({ value, icon: Icon, label, desc }) => {
                  const isSelected = formData.visibility === value;
                  return (
                    <div 
                      key={value}
                      onClick={() => setFormData({ ...formData, visibility: value })}
                      className={cn(
                        "cursor-pointer rounded-[1.5rem] border p-4 transition-all duration-300 flex items-start gap-4",
                        isSelected 
                          ? "border-brand-500/50 bg-brand-500/10 ring-1 ring-brand-500/20" 
                          : "border-white/5 bg-surface-950/30 hover:border-white/10"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-xl border transition-colors",
                        isSelected ? "bg-brand-500 text-white border-brand-500" : "bg-surface-800 text-surface-600 border-white/5"
                      )}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className={cn("font-bold text-sm", isSelected ? "text-white" : "text-surface-300")}>{label}</div>
                        <div className="text-[10px] text-surface-600 mt-0.5 font-medium">{desc}</div>
                      </div>
                      {isSelected && <Check size={14} className="text-brand-400 mt-1" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Info Card */}
          <div className="p-6 rounded-[2rem] gradient-brand border border-white/10 shadow-2xl shadow-brand-500/20 text-white overflow-hidden relative group">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-3">
                 <Sparkles size={16} className="text-white animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Traveloop Intelligence</span>
               </div>
               <p className="text-xs font-bold leading-relaxed">
                 You can always change these settings later. Our AI will help you populate activities based on your choices.
               </p>
             </div>
             <Zap size={60} className="absolute -bottom-4 -right-4 text-white/10 group-hover:scale-125 transition-transform duration-700" />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full py-8 text-lg font-black rounded-[2rem] shadow-2xl shadow-brand-500/40 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              {loading ? (
                <div className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <span>Initialize Journey</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
