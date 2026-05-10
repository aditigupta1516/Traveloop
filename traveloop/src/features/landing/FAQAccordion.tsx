"use client";
// src/features/landing/FAQAccordion.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "Is Traveloop free to use?", a: "Yes! Traveloop offers a generous free plan with up to 3 active trips, basic AI suggestions, and all core planning features. Premium plans unlock unlimited trips, advanced AI, and collaboration features." },
  { q: "How does the AI itinerary builder work?", a: "Our AI analyzes your destination, travel dates, budget, and preferences to generate a personalized day-by-day itinerary. It considers local events, weather patterns, popular attractions, and optimal routing between locations." },
  { q: "Can I collaborate with friends on trip planning?", a: "Absolutely! You can invite collaborators via email or share a link. Collaborators can view, edit, or comment on your trip (based on permissions you set), making group travel planning seamless." },
  { q: "Is my data secure?", a: "Yes. We use bank-grade AES-256 encryption, secure HTTPS connections, and follow GDPR compliance standards. Your travel data is never sold to third parties." },
  { q: "Can I use Traveloop offline?", a: "Yes! Traveloop is a Progressive Web App (PWA) with offline support. Your itineraries and packing lists are cached locally so you can access them even without internet." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, and Apple Pay. All payments are processed securely via Stripe." },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="glass border border-white/[0.06] rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium text-surface-200 hover:text-surface-100 transition-colors"
          >
            {faq.q}
            <ChevronDown
              size={16}
              className={`flex-shrink-0 text-surface-500 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-6 pb-5 text-sm text-surface-400 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
