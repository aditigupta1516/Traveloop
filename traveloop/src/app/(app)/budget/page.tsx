// src/app/(app)/budget/page.tsx
import type { Metadata } from "next";
import { BudgetDashboard } from "@/features/budget/BudgetDashboard";

export const metadata: Metadata = { title: "Budget Manager" };

export default function Budget() {
  return <BudgetDashboard />;
}
