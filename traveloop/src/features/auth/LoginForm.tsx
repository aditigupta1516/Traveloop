"use client";
// src/features/auth/LoginForm.tsx
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back! 🌍");
        router.push(callbackUrl);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: string) => {
    setSocialLoading(provider);
    await signIn(provider, { callbackUrl });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-90" />
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"
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
          <div>
            <blockquote className="text-2xl font-medium text-white leading-relaxed mb-4">
              &ldquo;The world is a book and those who do not travel read only one page.&rdquo;
            </blockquote>
            <p className="text-white/60">— Saint Augustine</p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-950">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <Globe size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-brand-text font-display">Traveloop</span>
            </Link>
            <h1 className="text-3xl font-bold text-surface-50 font-display mb-2">Welcome back</h1>
            <p className="text-surface-400">Sign in to continue planning your adventures</p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="secondary"
              size="md"
              loading={socialLoading === "google"}
              onClick={() => handleSocial("google")}
              icon={<FcGoogle size={16} />}
              className="justify-center"
            >
              Google
            </Button>
            <Button
              variant="secondary"
              size="md"
              loading={socialLoading === "github"}
              onClick={() => handleSocial("github")}
              icon={<FaGithub size={16} />}
              className="justify-center"
            >
              GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-800" />
            </div>
            <div className="relative flex justify-center text-xs text-surface-600">
              <span className="bg-surface-950 px-3">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={15} />}
              required
            />
            <Input
              label="Password"
              type={showPwd ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={15} />}
              rightIcon={
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="hover:text-surface-300 transition-colors">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              required
            />

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full" iconRight={<ArrowRight size={16} />}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
