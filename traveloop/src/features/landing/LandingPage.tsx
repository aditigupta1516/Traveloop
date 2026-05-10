"use client";
// src/features/landing/LandingPage.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Globe, Map, Users, PiggyBank,
  Star, CheckCircle, Zap, Shield, Brain, Compass,
  ChevronDown, Play, TrendingUp, Clock, MapPin,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TestimonialsCarousel } from "@/features/landing/TestimonialsCarousel";
import { FAQAccordion } from "@/features/landing/FAQAccordion";
import { PricingSection } from "@/features/landing/PricingSection";
import { FeatureShowcase } from "@/features/landing/FeatureShowcase";

const FLOAT_CARDS = [
  { city: "Tokyo", country: "Japan", days: "7 days", budget: "$2,400", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80", x: "-left-4", y: "top-20", delay: 0 },
  { city: "Paris", country: "France", days: "5 days", budget: "$1,800", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&q=80", x: "-right-8", y: "top-32", delay: 0.5 },
  { city: "Bali", country: "Indonesia", days: "10 days", budget: "$1,200", img: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&q=80", x: "left-8", y: "bottom-20", delay: 1 },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Trips Planned" },
  { value: 120, suffix: "+", label: "Countries" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 4.9, suffix: "★", label: "App Rating", decimals: 1 },
];

const FEATURES = [
  { icon: Brain, title: "AI Itinerary Builder", description: "Let AI craft your perfect day-by-day schedule based on your preferences, budget, and travel style.", color: "brand" },
  { icon: Map, title: "Interactive Maps", description: "Visualize your entire journey on beautiful maps with animated routes and destination markers.", color: "purple" },
  { icon: PiggyBank, title: "Smart Budgeting", description: "Track every expense, set budgets, and get real-time alerts with intelligent spending analytics.", color: "emerald" },
  { icon: Users, title: "Collaborative Planning", description: "Invite friends and plan together in real-time with shared editing and activity tracking.", color: "amber" },
  { icon: Compass, title: "Destination Discovery", description: "Explore trending destinations with weather insights, cost estimates, and curated activities.", color: "red" },
  { icon: Shield, title: "Enterprise Security", description: "Bank-grade encryption, RBAC, and secure data handling for peace of mind on every trip.", color: "brand" },
];

function FloatingCard({ city, country, days, budget, img, x, y, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: delay + 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ animationDelay: `${delay}s` }}
      className={`absolute ${x} ${y} w-48 glass rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.08] animate-float hidden lg:block`}
    >
      <img src={img} alt={city} className="w-full h-28 object-cover" />
      <div className="p-3">
        <p className="text-sm font-semibold text-surface-100">{city}</p>
        <p className="text-xs text-surface-400">{country}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-surface-500">{days}</span>
          <span className="text-xs font-medium text-brand-400">{budget}</span>
        </div>
      </div>
    </motion.div>
  );
}

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-surface-950 overflow-hidden">
      <Navbar />

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(58,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(58,107,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* ======================== HERO ======================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center max-w-5xl mx-auto relative z-10">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/20 text-sm mb-8"
          >
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-surface-300">Introducing AI-powered trip planning</span>
            <span className="gradient-brand-text font-semibold">v2.0 →</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display text-6xl md:text-7xl lg:text-8xl mb-6 leading-[1.05]"
          >
            Plan Trips That{" "}
            <br />
            <span className="gradient-brand-text">Feel Like Magic</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-surface-400 mb-10 max-w-2xl mx-auto text-balance"
          >
            AI-powered itineraries, collaborative planning, smart budgeting, and stunning maps — all in one platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/auth/register">
              <Button variant="gradient" size="xl" icon={<Sparkles size={18} />} iconRight={<ArrowRight size={18} />}>
                Start Planning Free
              </Button>
            </Link>
            <Button variant="ghost" size="xl" icon={<Play size={16} />} className="border border-surface-700/60">
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-8 text-sm text-surface-500"
          >
            {["No credit card required", "Free forever plan", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Cards */}
        {FLOAT_CARDS.map((card) => <FloatingCard key={card.city} {...card} />)}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-surface-600"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ======================== STATS ======================== */}
      <section className="py-16 px-4 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <SectionReveal key={stat.label}>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-brand-text font-display">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <p className="text-surface-500 text-sm mt-1">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ======================== FEATURE SHOWCASE ======================== */}
      <FeatureShowcase />

      {/* ======================== FEATURE GRID ======================== */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Everything You Need</Badge>
            <h2 className="text-display text-4xl md:text-5xl mb-4">Built for Modern Travelers</h2>
            <p className="text-surface-400 text-lg max-w-xl mx-auto">
              From first inspiration to final memory — Traveloop covers every step of your journey.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <SectionReveal key={feature.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-premium p-6 group"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${
                    feature.color === "brand" ? "bg-brand-500/10" :
                    feature.color === "purple" ? "bg-accent-500/10" :
                    feature.color === "emerald" ? "bg-emerald-500/10" :
                    feature.color === "amber" ? "bg-amber-500/10" : "bg-red-500/10"
                  }`}>
                    <feature.icon size={20} className={
                      feature.color === "brand" ? "text-brand-400" :
                      feature.color === "purple" ? "text-accent-400" :
                      feature.color === "emerald" ? "text-emerald-400" :
                      feature.color === "amber" ? "text-amber-400" : "text-red-400"
                    } />
                  </div>
                  <h3 className="text-base font-semibold text-surface-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="py-24 px-4 bg-surface-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <Badge variant="purple" className="mb-4">Loved by Travelers</Badge>
            <h2 className="text-display text-4xl md:text-5xl mb-4">Stories From the Road</h2>
          </SectionReveal>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ======================== PRICING ======================== */}
      <PricingSection />

      {/* ======================== FAQ ======================== */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <Badge variant="default" className="mb-4">FAQ</Badge>
            <h2 className="text-display text-4xl md:text-5xl mb-4">Got Questions?</h2>
          </SectionReveal>
          <FAQAccordion />
        </div>
      </section>

      {/* ======================== CTA BANNER ======================== */}
      <section className="py-24 px-4">
        <SectionReveal>
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 gradient-glow-blue rounded-3xl" />
            <div className="relative glass border border-brand-500/20 rounded-3xl p-12">
              <h2 className="text-display text-4xl md:text-5xl mb-4">
                Your Next Adventure Starts Here
              </h2>
              <p className="text-surface-400 text-lg mb-8 max-w-xl mx-auto">
                Join 50,000+ travelers who plan smarter, travel better, and create unforgettable memories.
              </p>
              <Link href="/auth/register">
                <Button variant="gradient" size="xl" icon={<Sparkles size={18} />}>
                  Start Planning — It's Free
                </Button>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ======================== FOOTER ======================== */}
      <footer className="border-t border-white/[0.06] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                  <Globe size={16} className="text-white" />
                </div>
                <span className="text-xl font-bold gradient-brand-text font-display">Traveloop</span>
              </div>
              <p className="text-sm text-surface-500 max-w-xs">
                AI-powered travel planning for the modern adventurer.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Roadmap", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy", "Licenses"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-surface-300 mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-surface-600">
            <p>© 2025 Traveloop. All rights reserved.</p>
            <p>Built with ❤️ for travelers worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
