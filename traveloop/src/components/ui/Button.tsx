"use client";
// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive" | "gradient";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40",
  secondary:
    "bg-surface-800 hover:bg-surface-700 text-surface-100 border border-surface-700/60",
  ghost:
    "hover:bg-white/5 text-surface-300 hover:text-surface-100",
  outline:
    "border border-surface-700 hover:border-brand-500 text-surface-300 hover:text-brand-400 hover:bg-brand-500/5",
  destructive:
    "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40",
  gradient:
    "gradient-brand text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
  xl: "h-14 px-8 text-lg gap-3 rounded-2xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    loading,
    icon,
    iconRight,
    children,
    className,
    disabled,
    ...props
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950",
          "disabled:opacity-50 disabled:pointer-events-none select-none",
          "cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          icon
        )}
        {children}
        {iconRight && !loading && iconRight}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
