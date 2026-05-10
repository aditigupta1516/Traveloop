// src/app/(app)/journal/page.tsx
import type { Metadata } from "next";
import { JournalDashboard } from "@/features/journal/JournalDashboard";

export const metadata: Metadata = { title: "Travel Journal" };

export default function Journal() {
  return <JournalDashboard />;
}
