"use client";
// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  Globe, Bell, Search, ChevronDown, LogOut, Settings,
  User, LayoutDashboard, Compass, Menu, X, Command, Sparkles,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/destinations", label: "Destinations" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { unreadCount, toggleCommandPalette } = useAppStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isLanding = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isLanding
            ? "glass-strong border-b border-white/[0.06] py-3"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
                <Globe size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-brand-text font-display">Traveloop</span>
            </Link>

            {/* Desktop Nav */}
            {isLanding && (
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm text-surface-400 hover:text-surface-100 rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {session ? (
                <>
                  {/* Command Palette */}
                  <button
                    onClick={toggleCommandPalette}
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/60 border border-surface-700/40 text-surface-400 text-xs hover:border-surface-600 transition-all"
                    title="Command Palette (⌘K)"
                  >
                    <Command size={12} />
                    <span>Search...</span>
                    <kbd className="text-surface-600">⌘K</kbd>
                  </button>

                  {/* Notifications */}
                  <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-white/5 text-surface-400 hover:text-surface-200 transition-all">
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
                    )}
                  </Link>

                  {/* Dashboard */}
                  <Link href="/dashboard">
                    <Button variant="secondary" size="sm" icon={<LayoutDashboard size={14} />}>
                      Dashboard
                    </Button>
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen((o) => !o)}
                      className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(session.user?.name ?? "U")}
                      </div>
                      <ChevronDown size={14} className={cn("text-surface-400 transition-transform", profileOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                          onMouseLeave={() => setProfileOpen(false)}
                        >
                          <div className="p-3 border-b border-white/[0.06]">
                            <p className="text-sm font-semibold text-surface-100">{session.user?.name}</p>
                            <p className="text-xs text-surface-500 truncate">{session.user?.email}</p>
                          </div>
                          <div className="p-2">
                            {[
                              { href: "/profile", icon: User, label: "Profile" },
                              { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                              { href: "/settings", icon: Settings, label: "Settings" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-surface-300 hover:text-surface-100 hover:bg-white/5 transition-all"
                              >
                                <item.icon size={15} className="text-surface-500" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className="p-2 border-t border-white/[0.06]">
                            <button
                              onClick={() => signOut({ callbackUrl: "/" })}
                              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full transition-all"
                            >
                              <LogOut size={15} />
                              Sign out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="gradient" size="sm" icon={<Sparkles size={14} />}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu */}
              <button
                className="md:hidden p-2 rounded-xl hover:bg-white/5 text-surface-400"
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-strong border-t border-white/[0.06] overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-surface-300 hover:text-surface-100 hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                {!session && (
                  <div className="flex gap-2 pt-2 border-t border-white/[0.06]">
                    <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="secondary" size="sm" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/auth/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="gradient" size="sm" className="w-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
