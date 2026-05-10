"use client";
// src/components/layout/CommandPalette.tsx
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, Map, Compass, PiggyBank, Settings, Globe, Users, BookOpen, LayoutDashboard, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const commands = [
  { id: "dashboard", label: "Go to Dashboard", icon: LayoutDashboard, href: "/dashboard", category: "Navigation" },
  { id: "trips", label: "My Trips", icon: Map, href: "/trips", category: "Navigation" },
  { id: "new-trip", label: "Create New Trip", icon: Globe, href: "/trips/new", category: "Actions" },
  { id: "explore", label: "Explore Destinations", icon: Compass, href: "/explore", category: "Navigation" },
  { id: "budget", label: "Budget Manager", icon: PiggyBank, href: "/budget", category: "Navigation" },
  { id: "journal", label: "Travel Journal", icon: BookOpen, href: "/journal", category: "Navigation" },
  { id: "collaborate", label: "Collaborate", icon: Users, href: "/collaborate", category: "Navigation" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings", category: "Account" },
];

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, toggleCommandPalette } = useAppStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((href: string) => {
    router.push(href);
    toggleCommandPalette();
    setQuery("");
    setSelected(0);
  }, [router, toggleCommandPalette]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (!commandPaletteOpen) return;
      if (e.key === "Escape") toggleCommandPalette();
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) execute(filtered[selected].href);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, filtered, selected, execute, toggleCommandPalette]);

  useEffect(() => setSelected(0), [query]);

  const grouped = filtered.reduce<Record<string, typeof commands>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={toggleCommandPalette}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl glass-strong rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/[0.08]"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
              <Search size={17} className="text-surface-500 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, trips, pages..."
                className="flex-1 bg-transparent text-surface-100 placeholder:text-surface-500 text-sm outline-none"
              />
              <kbd className="text-xs text-surface-600 bg-surface-800 px-1.5 py-0.5 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2 scrollbar-hide">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-surface-600 uppercase tracking-wider px-4 py-2">{category}</p>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => execute(item.href)}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-all",
                        filtered.indexOf(item) === selected
                          ? "bg-brand-500/10 text-brand-400"
                          : "text-surface-300 hover:bg-white/5 hover:text-surface-100"
                      )}
                    >
                      <item.icon size={15} />
                      {item.label}
                      <ArrowRight size={13} className="ml-auto opacity-50" />
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-surface-500 py-8">No results found</p>
              )}
            </div>

            <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-4 text-xs text-surface-600">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
