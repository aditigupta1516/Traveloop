// src/app/(app)/packing/page.tsx
import type { Metadata } from "next";
import { PackingDashboard } from "@/features/packing/PackingDashboard";

export const metadata: Metadata = { title: "Packing Checklist" };

export default function Packing() {
  return <PackingDashboard />;
}
