"use client";
// src/features/trips/CreateTripWizard.tsx
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, PiggyBank, Users, Sparkles, ArrowRight, ArrowLeft, Check, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "destination", title: "Where to?", icon: MapPin },
  { id: "dates", title: "When?", icon: Calendar },
  { id: "details", title: "Trip Details", icon: PiggyBank },
  { id: "preview", title: "Review", icon: Check },
];

export function CreateTripWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAI = searchParams.get("ai") === "true";
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    companions: "1",
    notes: "",
  });

  const nextStep = () => {
    if (step === 0 && !form.destination) return toast.error("Please enter a destination");
    if (step === 1 && (!form.startDate || !form.endDate)) return toast.error("Please select dates");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const update = (field: keyof typeof form) => (e: any) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    // Mock API call to create trip
    setTimeout(() => {
      setLoading(false);
      toast.success(isAI ? "AI is generating your itinerary! 🪄" : "Trip created successfully! 🎉");
      // For demo, redirect to a mock trip ID
      router.push(`/trips/demo-trip-123`);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {isAI && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl gradient-brand flex items-center justify-center gap-3 text-white shadow-xl shadow-brand-500/20"
        >
          <Sparkles size={20} className="animate-pulse" />
          <span className="font-semibold">AI Itinerary Builder is active. Just tell us the basics!</span>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-800 -translate-y-1/2 rounded-full z-0" />
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 rounded-full z-0"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          
          {STEPS.map((s, i) => {
            const isActive = i <= step;
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  animate={{ 
                    backgroundColor: isActive ? "#3a6bff" : "#1e293b",
                    borderColor: isActive ? "#3a6bff" : "#334155" 
                  }}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-colors",
                    isActive ? "text-white shadow-lg shadow-brand-500/40" : "text-surface-500"
                  )}
                >
                  <s.icon size={18} />
                </motion.div>
                <span className={cn("text-xs font-medium absolute -bottom-6 whitespace-nowrap", isActive ? "text-brand-400" : "text-surface-600")}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card variant="premium" className="p-8 mt-12 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {/* STEP 0: Destination */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-surface-50 font-display mb-2">Where are you going?</h2>
                  <p className="text-surface-400">Search for a city, region, or country.</p>
                </div>
                <Input
                  autoFocus
                  placeholder="e.g., Tokyo, Japan"
                  value={form.destination}
                  onChange={update("destination")}
                  leftIcon={<MapPin size={18} />}
                  className="text-lg py-4 h-auto"
                />
                
                <div className="pt-6">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Popular right now</p>
                  <div className="flex flex-wrap gap-2">
                    {["Paris, France", "Bali, Indonesia", "Rome, Italy", "New York, USA"].map((dest) => (
                      <button
                        key={dest}
                        onClick={() => setForm(f => ({ ...f, destination: dest }))}
                        className="px-4 py-2 rounded-xl glass border border-white/[0.06] text-sm text-surface-300 hover:text-surface-100 hover:bg-white/5 transition-all"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: Dates */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-surface-50 font-display mb-2">When are you traveling?</h2>
                  <p className="text-surface-400">Select your departure and return dates.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={form.startDate}
                    onChange={update("startDate")}
                    leftIcon={<Calendar size={18} />}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={form.endDate}
                    onChange={update("endDate")}
                    leftIcon={<Calendar size={18} />}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-surface-50 font-display mb-2">Trip Details</h2>
                  <p className="text-surface-400">Add a few more details to help us plan better.</p>
                </div>
                
                <Input
                  label="Trip Title"
                  placeholder={`My trip to ${form.destination.split(",")[0] || "Somewhere"}`}
                  value={form.title}
                  onChange={update("title")}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Budget (Total)"
                    type="number"
                    placeholder="2500"
                    value={form.budget}
                    onChange={update("budget")}
                    leftIcon={<span className="text-surface-500 font-medium">$</span>}
                  />
                  <Input
                    label="Companions"
                    type="number"
                    min="1"
                    value={form.companions}
                    onChange={update("companions")}
                    leftIcon={<Users size={18} />}
                  />
                </div>

                {isAI && (
                  <Textarea
                    label="Any specific preferences? (For AI)"
                    placeholder="e.g., We love local food markets, history, and modern art. No early mornings please."
                    value={form.notes}
                    onChange={update("notes")}
                    rows={3}
                  />
                )}
              </div>
            )}

            {/* STEP 3: Preview */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-surface-50 font-display mb-2">Ready to pack?</h2>
                  <p className="text-surface-400">Review your trip details before we set it up.</p>
                </div>
                
                <div className="rounded-2xl overflow-hidden glass border border-white/[0.06]">
                  <div className="h-32 bg-surface-800 relative">
                    <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80" alt="Cover" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-xl font-bold text-white">{form.title || `Trip to ${form.destination}`}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Destination</p>
                      <p className="font-medium text-surface-200">{form.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Dates</p>
                      <p className="font-medium text-surface-200">{form.startDate} to {form.endDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Budget</p>
                      <p className="font-medium text-surface-200">${form.budget || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Travelers</p>
                      <p className="font-medium text-surface-200">{form.companions} people</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 0 || loading}
            icon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          
          {step < STEPS.length - 1 ? (
            <Button
              variant="primary"
              onClick={nextStep}
              iconRight={<ArrowRight size={16} />}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="gradient"
              onClick={handleSubmit}
              loading={loading}
              icon={isAI ? <Sparkles size={16} /> : <Check size={16} />}
            >
              {isAI ? "Generate Itinerary" : "Create Trip"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
