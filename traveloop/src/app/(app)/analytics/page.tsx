// src/app/(app)/analytics/page.tsx
import type { Metadata } from "next";
import { AnalyticsDashboard } from "@/features/community/AnalyticsDashboard";

export const metadata: Metadata = { title: "Travel Analytics" };

export default function Analytics() {
  return <AnalyticsDashboard />;
}
