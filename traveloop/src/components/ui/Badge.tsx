"use client";
// src/components/ui/Badge.tsx
import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "purple" | "outline";

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-surface-800 text-surface-300 border border-surface-700/40",
  primary: "bg-brand-500/10 text-brand-400 border border-brand-500/20",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger: "bg-red-500/10 text-red-400 border border-red-500/20",
  purple: "bg-accent-500/10 text-accent-400 border border-accent-500/20",
  outline: "border border-surface-600 text-surface-400",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ variant = "default", dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-brand-400": variant === "primary",
          "bg-emerald-400": variant === "success",
          "bg-amber-400": variant === "warning",
          "bg-red-400": variant === "danger",
          "bg-accent-400": variant === "purple",
          "bg-surface-400": variant === "default" || variant === "outline",
        })} />
      )}
      {children}
    </span>
  );
}

// TripStatus Badge helper
export function TripStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    PLANNING: { variant: "primary", label: "Planning" },
    UPCOMING: { variant: "warning", label: "Upcoming" },
    ONGOING: { variant: "success", label: "Ongoing" },
    COMPLETED: { variant: "default", label: "Completed" },
    CANCELLED: { variant: "danger", label: "Cancelled" },
  };
  const config = map[status] ?? { variant: "default", label: status };
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
}
