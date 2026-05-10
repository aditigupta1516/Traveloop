// src/app/(app)/trips/page.tsx
import type { Metadata } from "next";
import { MyTripsDashboard } from "@/features/trips/MyTripsDashboard";

export const metadata: Metadata = { title: "My Trips" };

export default function Trips() {
  return <MyTripsDashboard />;
}
