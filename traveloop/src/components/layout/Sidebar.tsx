"use client";
// src/components/layout/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Map, Compass, PiggyBank, CheckSquare,
  BookOpen, Globe, Users, Settings, ChevronLeft, Plus,
  Sparkles, BarChart3, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";

const navItems = [
  { section: "Main", items: [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/trips", icon: Map, label: "My Trips" },
    { href: "/explore", icon: Compass, label: "Explore" },
  ]},
  { section: "Planning", items: [
    { href: "/itinerary", icon: Globe, label: "Itinerary" },
    { href: "/budget", icon: PiggyBank, label: "Budget" },
    { href: "/packing", icon: CheckSquare, label: "Packing" },
    { href: "/journal", icon: BookOpen, label: "Journal" },
  ]},
  { section: "Community", items: [
    { href: "/discover", icon: Star, label: "Discover" },
    { href: "/collaborate", icon: Users, label: "Collaborate" },
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
  ]},
  { section: "Account", items: [
    { href: "/settings", icon: Settings, label: "Settings" },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 glass-strong border-r border-white/[0.06] overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30">
            <Globe size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-lg font-bold gradient-brand-text font-display whitespace-nowrap"
              >
                Traveloop
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* New Trip Button */}
        <div className="px-3 py-3 border-b border-white/[0.06]">
          <Link href="/trips/new">
            <motion.div
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl gradient-brand text-white text-sm font-medium cursor-pointer",
                "shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all",
                !sidebarOpen && "justify-center px-2"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} className="flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    New Trip
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-hide">
          {navItems.map((section) => (
            <div key={section.section}>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-1.5 px-2"
                  >
                    {section.section}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer",
                          !sidebarOpen && "justify-center px-2",
                          isActive
                            ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                            : "text-surface-400 hover:text-surface-200 hover:bg-white/5"
                        )}
                        title={!sidebarOpen ? item.label : undefined}
                      >
                        <item.icon size={17} className={cn("flex-shrink-0", isActive && "text-brand-400")} />
                        <AnimatePresence>
                          {sidebarOpen && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="whitespace-nowrap font-medium"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {isActive && sidebarOpen && (
                          <motion.div
                            layoutId="active-pill"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-surface-500 hover:text-surface-300 hover:bg-white/5 transition-all text-sm"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronLeft
              size={16}
              className={cn("transition-transform duration-300 flex-shrink-0", !sidebarOpen && "rotate-180")}
            />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/[0.06] flex items-center justify-around py-2 px-4">
        {[
          { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
          { href: "/trips", icon: Map, label: "Trips" },
          { href: "/trips/new", icon: Plus, label: "New", special: true },
          { href: "/explore", icon: Compass, label: "Explore" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-all px-3 py-1",
                item.special
                  ? "relative"
                  : isActive ? "text-brand-400" : "text-surface-500"
              )}
            >
              {item.special ? (
                <span className="w-11 h-11 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30 -translate-y-3">
                  <item.icon size={20} className="text-white" />
                </span>
              ) : (
                <>
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
