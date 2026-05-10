"use client";
// src/components/ui/Card.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "premium" | "elevated";
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}

const cardVariants = {
  default: "bg-surface-900 border border-surface-800/60",
  glass: "glass",
  premium: "card-premium",
  elevated: "bg-surface-800 border border-surface-700/40 shadow-xl shadow-black/30",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hover = true, className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "rounded-2xl overflow-hidden",
          cardVariants[variant],
          hover && "transition-all duration-300 hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5 pb-3", className)} {...props}>{children}</div>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5 pt-0", className)} {...props}>{children}</div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-5 py-4 border-t border-surface-800/60", className)} {...props}>{children}</div>
);

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-base font-semibold text-surface-50", className)} {...props}>{children}</h3>
);

export const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-surface-400 mt-0.5", className)} {...props}>{children}</p>
);
