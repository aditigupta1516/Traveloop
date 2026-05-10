"use client";
// src/features/auth/RegisterForm.tsx
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axios from "axios";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    try {
      await axios.post("/api/auth/register", form);
      toast.success("Account created! Signing you in...");
      await signIn("credentials", { email: form.email, password: form.password, callbackUrl: "/dashboard" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-90" />
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-display">Traveloop</span>
          </Link>
          <div className="space-y-6">
            {["✅ Free forever plan", "🌍 AI itinerary builder", "👥 Collaborative planning", "📊 Smart budgeting"].map((f) => (
              <p key={f} className="text-white/80 text-lg">{f}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-950">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <Globe size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-brand-text font-display">Traveloop</span>
            </Link>
            <h1 className="text-3xl font-bold text-surface-50 font-display mb-2">Start your adventure</h1>
            <p className="text-surface-400">Create your free account in seconds</p>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="secondary" size="md" loading={socialLoading === "google"} onClick={() => { setSocialLoading("google"); signIn("google", { callbackUrl: "/dashboard" }); }} icon={<FcGoogle size={16} />} className="justify-center">Google</Button>
            <Button variant="secondary" size="md" loading={socialLoading === "github"} onClick={() => { setSocialLoading("github"); signIn("github", { callbackUrl: "/dashboard" }); }} icon={<FaGithub size={16} />} className="justify-center">GitHub</Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-800" /></div>
            <div className="relative flex justify-center text-xs text-surface-600"><span className="bg-surface-950 px-3">or with email</span></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input label="Full Name" placeholder="Alex Johnson" value={form.name} onChange={set("name")} leftIcon={<User size={15} />} required />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} leftIcon={<Mail size={15} />} required />
            <Input
              label="Password"
              type={showPwd ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={set("password")}
              leftIcon={<Lock size={15} />}
              hint="At least 8 characters"
              rightIcon={<button type="button" onClick={() => setShowPwd((s) => !s)} className="hover:text-surface-300 transition-colors">{showPwd ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
              required
            />
            <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full" icon={<Sparkles size={16} />} iconRight={<ArrowRight size={16} />}>
              Create Free Account
            </Button>
          </form>

          <p className="text-xs text-surface-600 text-center mt-4">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-brand-400 hover:underline">Terms</a> and{" "}
            <a href="/privacy" className="text-brand-400 hover:underline">Privacy Policy</a>.
          </p>
          <p className="text-center text-sm text-surface-500 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
