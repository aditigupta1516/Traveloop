// src/app/(app)/discover/page.tsx
import type { Metadata } from "next";
import { DiscoverDashboard } from "@/features/discover/DiscoverDashboard";

export const metadata: Metadata = { title: "Discover" };

export default function Discover() {
  return <DiscoverDashboard />;
}
