"use client";
// src/features/community/CollaborateDashboard.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Mail, Copy, Link as LinkIcon, Shield, Check, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const COLLABORATORS = [
  { id: 1, name: "Aditi Gupta", email: "aditi@example.com", role: "Owner", avatar: "AG" },
  { id: 2, name: "Rahul Sharma", email: "rahul@example.com", role: "Editor", avatar: "RS" },
  { id: 3, name: "Priya Patel", email: "priya@example.com", role: "Viewer", avatar: "PP" },
];

export function CollaborateDashboard() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Collaborate</h1>
          <p className="text-surface-400">Invite friends to plan your trip together in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Invite Section */}
          <Card className="p-6 bg-surface-900/50 border border-white/[0.06]">
            <h2 className="text-xl font-bold text-surface-100 mb-4 flex items-center gap-2"><UserPlus size={20} className="text-brand-400" /> Invite via Email</h2>
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <Input placeholder="friend@example.com" leftIcon={<Mail size={16} />} />
              </div>
              <Button variant="gradient">Send Invite</Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-800" /></div>
              <div className="relative flex justify-center text-xs text-surface-600"><span className="bg-surface-900/50 px-3">or share link</span></div>
            </div>

            <h2 className="text-sm font-bold text-surface-100 mb-3 flex items-center gap-2"><LinkIcon size={16} /> Shareable Link</h2>
            <div className="flex gap-3">
              <div className="flex-1 bg-surface-950 border border-surface-800 rounded-xl px-4 py-2.5 flex items-center overflow-hidden">
                <span className="text-surface-400 text-sm truncate">https://traveloop.app/invite/t-8f92a1b</span>
              </div>
              <Button variant="secondary" onClick={copyLink} icon={copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}>
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </Card>

          {/* Members List */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-surface-100 mb-6 flex items-center gap-2"><Users size={20} className="text-surface-400" /> Trip Members</h2>
            <div className="space-y-4">
              {COLLABORATORS.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center font-bold text-white text-sm shadow-lg">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-surface-100">{member.name}</h4>
                      <p className="text-xs text-surface-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {member.role === "Owner" ? (
                      <Badge variant="primary">Owner</Badge>
                    ) : (
                      <select defaultValue={member.role} className="bg-surface-900 border border-surface-700 text-surface-300 text-sm rounded-lg px-2 py-1 outline-none">
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    )}
                    {member.role !== "Owner" && (
                      <button className="text-surface-600 hover:text-red-400 transition-colors p-1"><Trash2 size={16} /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Roles Info Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-brand-500/5 border-brand-500/20">
            <h3 className="font-bold text-brand-400 mb-4 flex items-center gap-2"><Shield size={18} /> Role Permissions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-bold text-surface-100 mb-1">Owner</h4>
                <p className="text-surface-400 leading-relaxed">Can invite members, manage roles, and delete the trip.</p>
              </div>
              <div className="w-full h-[1px] bg-white/[0.06]" />
              <div>
                <h4 className="font-bold text-surface-100 mb-1">Editor</h4>
                <p className="text-surface-400 leading-relaxed">Can add activities, edit budgets, and modify checklists.</p>
              </div>
              <div className="w-full h-[1px] bg-white/[0.06]" />
              <div>
                <h4 className="font-bold text-surface-100 mb-1">Viewer</h4>
                <p className="text-surface-400 leading-relaxed">Can only view the itinerary and leave comments.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
