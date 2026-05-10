"use client";
// src/features/settings/SettingsPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette, MapPin, Edit3, Camera, Map } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const PREPLANNED_TRIPS = [
  { id: 1, title: "Tokyo Adventure", date: "Oct 10, 2026", status: "Upcoming", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { id: 2, title: "Swiss Alps Ski Trip", date: "Dec 15, 2026", status: "Planning", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80" },
];

const PREVIOUS_TRIPS = [
  { id: 3, title: "Bali Retreat", date: "Jun 5, 2025", duration: "14 days", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
  { id: 4, title: "New York Weekend", date: "Mar 12, 2025", duration: "4 days", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Profile & Settings</h1>
          <p className="text-surface-400">Manage your account, preferences, and travel history.</p>
        </div>
        <div className="flex bg-surface-900/50 p-1 rounded-xl border border-white/[0.06] w-fit">
          {["profile", "preferences", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-surface-800 text-brand-400 shadow-sm"
                  : "text-surface-400 hover:text-surface-200 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Profile Card */}
              <Card variant="premium" className="p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-800 bg-brand-500/20 flex items-center justify-center">
                      <span className="text-3xl font-display font-bold text-brand-400">AG</span>
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-surface-50">Aditi Gupta</h2>
                        <p className="text-surface-400 flex items-center gap-2 mt-1"><MapPin size={14} /> New Delhi, India</p>
                      </div>
                      <Button variant="secondary" size="sm" icon={<Edit3 size={14} />}>Edit Profile</Button>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Badge variant="primary">Pro Member</Badge>
                      <Badge variant="secondary">12 Trips Completed</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Full Name" defaultValue="Aditi Gupta" />
                  <Input label="Email Address" defaultValue="aditi@example.com" />
                  <Input label="Location" defaultValue="New Delhi, India" />
                  <Input label="Bio" defaultValue="Travel enthusiast & photographer." />
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="gradient">Save Changes</Button>
                </div>
              </Card>

              {/* Preplanned Trips Gallery */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-surface-100 flex items-center gap-2"><Map size={18} className="text-brand-400" /> Preplanned Trips</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PREPLANNED_TRIPS.map((trip) => (
                    <Card key={trip.id} className="overflow-hidden group cursor-pointer border-white/[0.04] hover:border-brand-500/30 transition-colors">
                      <div className="h-32 relative">
                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                          <div>
                            <h4 className="text-white font-medium">{trip.title}</h4>
                            <p className="text-xs text-surface-300">{trip.date}</p>
                          </div>
                          <Badge variant="primary" className="text-[10px] py-0.5 px-2 h-auto">{trip.status}</Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Previous Trips Gallery */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-surface-100 flex items-center gap-2"><Map size={18} className="text-surface-500" /> Previous Trips</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PREVIOUS_TRIPS.map((trip) => (
                    <Card key={trip.id} className="overflow-hidden group cursor-pointer border-white/[0.04]">
                      <div className="h-32 relative">
                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                          <div>
                            <h4 className="text-white font-medium">{trip.title}</h4>
                            <p className="text-xs text-surface-300">{trip.date}</p>
                          </div>
                          <span className="text-xs text-surface-400 bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">{trip.duration}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "preferences" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="premium" className="p-8">
                <h2 className="text-2xl font-bold text-surface-50 mb-6 flex items-center gap-2"><Palette size={20} className="text-brand-400" /> App Preferences</h2>
                {/* Mock Preference Settings */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50 border border-white/[0.04]">
                    <div>
                      <h4 className="font-medium text-surface-100">Dark Mode</h4>
                      <p className="text-sm text-surface-400">Toggle dark/light theme across the app.</p>
                    </div>
                    <div className="w-12 h-6 bg-brand-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" /></div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50 border border-white/[0.04]">
                    <div>
                      <h4 className="font-medium text-surface-100">Currency</h4>
                      <p className="text-sm text-surface-400">Default currency for budget tracking.</p>
                    </div>
                    <select className="bg-surface-900 border border-surface-700 text-surface-100 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand-500">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50 border border-white/[0.04]">
                    <div>
                      <h4 className="font-medium text-surface-100">Notifications</h4>
                      <p className="text-sm text-surface-400">Email alerts for trip updates and collaboration.</p>
                    </div>
                    <div className="w-12 h-6 bg-brand-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" /></div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 bg-surface-900/50">
            <h3 className="font-bold text-surface-100 mb-4 flex items-center gap-2"><Shield size={16} className="text-emerald-400" /> Account Security</h3>
            <div className="space-y-4">
              <Button variant="secondary" className="w-full justify-start">Change Password</Button>
              <Button variant="secondary" className="w-full justify-start">Two-Factor Authentication</Button>
              <Button variant="danger" className="w-full justify-start">Delete Account</Button>
            </div>
          </Card>
          
          <Card className="p-6 bg-brand-500/10 border-brand-500/20">
            <h3 className="font-bold text-brand-400 mb-2">Upgrade to Pro</h3>
            <p className="text-sm text-surface-300 mb-4">Unlock AI itinerary generation, unlimited collaboration, and advanced budget tools.</p>
            <Button variant="gradient" className="w-full">View Plans</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
