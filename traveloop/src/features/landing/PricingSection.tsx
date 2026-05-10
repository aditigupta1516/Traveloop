"use client";
// src/features/landing/PricingSection.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PLANS = [
  {
    id: "free",
    name: "Explorer",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for casual travelers getting started.",
    features: ["Up to 3 active trips", "Basic AI suggestions", "Interactive maps", "Packing lists", "Travel journal", "Community access"],
    cta: "Get Started Free",
    href: "/auth/register",
    popular: false,
  },
  {
    id: "pro",
    name: "Adventurer",
    monthlyPrice: 12,
    yearlyPrice: 9,
    description: "Everything you need for serious travel planning.",
    features: ["Unlimited trips", "Advanced AI itinerary", "Collaborative planning (5 people)", "Budget tracking & alerts", "Currency conversion", "Priority support", "Offline mode", "Export to PDF"],
    cta: "Start Free Trial",
    href: "/auth/register?plan=pro",
    popular: true,
  },
  {
    id: "team",
    name: "Expedition",
    monthlyPrice: 29,
    yearlyPrice: 22,
    description: "For travel agencies and group planners.",
    features: ["Everything in Adventurer", "Unlimited collaborators", "White-label export", "Admin dashboard", "Analytics & reporting", "API access", "Custom integrations", "24/7 dedicated support"],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(true);

  return (
    <section className="py-24 px-4 bg-surface-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Pricing</Badge>
          <h2 className="text-display text-4xl md:text-5xl mb-4">Simple, Transparent Pricing</h2>
          <p className="text-surface-400 text-lg mb-8">No hidden fees. Cancel anytime.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 glass rounded-2xl border border-white/[0.06]">
            <button
              onClick={() => setYearly(false)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", !yearly ? "bg-surface-700 text-surface-100" : "text-surface-400")}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2", yearly ? "bg-surface-700 text-surface-100" : "text-surface-400")}
            >
              Yearly
              <Badge variant="success" className="text-xs">Save 25%</Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl p-6 flex flex-col",
                plan.popular
                  ? "gradient-brand shadow-2xl shadow-brand-500/30"
                  : "glass border border-white/[0.08]"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-white text-brand-600 border-0 shadow-lg">
                    <Sparkles size={11} /> Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn("text-lg font-bold mb-1", plan.popular ? "text-white" : "text-surface-100")}>{plan.name}</h3>
                <p className={cn("text-sm mb-4", plan.popular ? "text-white/70" : "text-surface-400")}>{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className={cn("text-4xl font-bold font-display", plan.popular ? "text-white" : "text-surface-50")}>
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className={cn("text-sm mb-1", plan.popular ? "text-white/60" : "text-surface-500")}>
                    {plan.monthlyPrice > 0 ? "/month" : ""}
                  </span>
                </div>
                {yearly && plan.yearlyPrice > 0 && (
                  <p className={cn("text-xs mt-1", plan.popular ? "text-white/60" : "text-surface-500")}>
                    Billed ${plan.yearlyPrice * 12}/year
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check size={15} className={plan.popular ? "text-white" : "text-emerald-400"} />
                    <span className={plan.popular ? "text-white/80" : "text-surface-300"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.popular ? "secondary" : "primary"}
                  className={cn("w-full", plan.popular && "bg-white hover:bg-white/90 text-brand-700")}
                  size="md"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
