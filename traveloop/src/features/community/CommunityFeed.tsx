"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, 
  Image as ImageIcon, MapPin, Send, Plus, 
  Search, Globe, TrendingUp, Users, Bookmark
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const POSTS = [
  {
    id: 1,
    user: { name: "Sarah Wanderlust", avatar: "https://i.pravatar.cc/150?u=sarah", badge: "Explorer" },
    location: "Santorini, Greece",
    content: "The sunset in Oia is everything they promised and more. Can't believe this view is real! 🌅 #greece #travel",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    likes: 1240,
    comments: 85,
    time: "2h ago",
    liked: true
  },
  {
    id: 2,
    user: { name: "Mark Adventurer", avatar: "https://i.pravatar.cc/150?u=mark", badge: "Local Guide" },
    location: "Machu Picchu, Peru",
    content: "Finally checked this off my bucket list. Pro tip: Arrive at 6 AM to see the mist lifting over the ruins. It's magical. 🏔️",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    likes: 856,
    comments: 42,
    time: "5h ago",
    liked: false
  },
  {
    id: 3,
    user: { name: "Elena Journeys", avatar: "https://i.pravatar.cc/150?u=elena", badge: "Photographer" },
    location: "Kyoto, Japan",
    content: "Found this hidden shrine in the hills of Kyoto. Not a single tourist in sight. This is why I love slow travel. 🎋",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    likes: 2103,
    comments: 112,
    time: "1d ago",
    liked: true
  }
];

export function CommunityFeed() {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <div className="flex gap-10 max-w-7xl mx-auto py-6">
      
      {/* Left Sidebar: Filters */}
      <div className="hidden lg:block w-64 space-y-8">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-surface-500 uppercase tracking-[0.2em] mb-4">Feed Discovery</h3>
          <div className="space-y-2">
             {['Trending', 'Latest', 'Following', 'Saved'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab.toLowerCase())}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-surface-400 hover:bg-white/5 border border-transparent'}`}
               >
                 {tab === 'Trending' && <TrendingUp size={16} />}
                 {tab === 'Latest' && <Globe size={16} />}
                 {tab === 'Following' && <Users size={16} />}
                 {tab === 'Saved' && <Bookmark size={16} />}
                 {tab}
               </button>
             ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-surface-900/30 border border-white/5">
           <h3 className="text-xs font-black text-white mb-4 uppercase tracking-widest">Top Destinations</h3>
           <div className="space-y-3">
             {['#Tokyo', '#Paris', '#Bali', '#Rome'].map(tag => (
               <p key={tag} className="text-xs font-medium text-brand-400 hover:text-brand-300 cursor-pointer transition-colors">{tag}</p>
             ))}
           </div>
        </div>
      </div>

      {/* Center Feed */}
      <div className="flex-1 space-y-8">
        
        {/* Create Post Card */}
        <Card className="p-8 rounded-[2.5rem] bg-surface-900/30 border-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="flex gap-5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl shrink-0">
               <img src="https://i.pravatar.cc/150?u=me" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="Share your latest adventure with the community..." 
                className="w-full bg-transparent text-lg font-medium text-surface-50 placeholder-surface-600 outline-none resize-none h-24 pt-3"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div className="flex gap-3">
                   <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white transition-all text-[11px] font-bold">
                     <ImageIcon size={16} className="text-brand-400" /> Photo
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white transition-all text-[11px] font-bold">
                     <MapPin size={16} className="text-emerald-400" /> Location
                   </button>
                </div>
                <Button variant="gradient" size="md" className="rounded-xl px-8" iconRight={<Send size={14} />}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-10">
          {POSTS.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-[3rem] overflow-hidden bg-surface-900/40 border-white/5 shadow-2xl group">
                {/* Post Header */}
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                       <img src={post.user.avatar} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm tracking-tight">{post.user.name}</span>
                        <Badge variant="secondary" className="bg-brand-500/10 text-brand-400 border-none text-[8px] font-black uppercase tracking-widest px-2">{post.user.badge}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-surface-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                        <MapPin size={10} className="text-emerald-500" /> {post.location} • {post.time}
                      </div>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-surface-400 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-8 pb-4">
                   <p className="text-surface-300 text-base leading-relaxed">{post.content}</p>
                </div>

                {/* Post Image */}
                <div className="px-8 pb-8">
                  <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                     <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                     <div className="absolute inset-0 bg-gradient-to-t from-surface-950/40 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-10 py-6 bg-white/[0.02] border-t border-white/5 flex items-center gap-8">
                   <button className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${post.liked ? 'text-rose-500' : 'text-surface-400 hover:text-rose-500'}`}>
                     <Heart size={20} fill={post.liked ? "currentColor" : "none"} /> {post.likes}
                   </button>
                   <button className="flex items-center gap-2 text-surface-400 hover:text-brand-400 text-xs font-black uppercase tracking-[0.2em] transition-all">
                     <MessageCircle size={20} /> {post.comments}
                   </button>
                   <button className="flex items-center gap-2 text-surface-400 hover:text-sky-400 text-xs font-black uppercase tracking-[0.2em] transition-all ml-auto">
                     <Share2 size={20} /> Share
                   </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Suggestions */}
      <div className="hidden xl:block w-80 space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
           <h3 className="text-xs font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
             <TrendingUp size={16} className="text-brand-400" /> Hot Destinations
           </h3>
           <div className="space-y-6">
             {[
               { name: 'Tokyo', posts: '1.2k posts', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
               { name: 'Paris', posts: '850 posts', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
               { name: 'Bali', posts: '2.4k posts', img: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&q=80' }
             ].map(dest => (
               <div key={dest.name} className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                    <img src={dest.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                   <p className="text-sm font-black text-white group-hover:text-brand-400 transition-colors font-display">{dest.name}</p>
                   <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">{dest.posts}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-surface-900/30 border border-white/5">
           <h3 className="text-xs font-black text-white mb-6 uppercase tracking-widest">Recommended</h3>
           <div className="space-y-5">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-surface-800" />
                   <div className="w-24 h-2 bg-white/5 rounded" />
                 </div>
                 <Button variant="secondary" size="sm" className="h-8 text-[9px] px-3">Follow</Button>
               </div>
             ))}
           </div>
        </div>
      </div>

    </div>
  );
}
