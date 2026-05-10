// src/app/(app)/itinerary/page.tsx
import type { Metadata } from "next";
import { GlobalItinerary } from "@/features/itinerary/GlobalItinerary";

export const metadata: Metadata = { title: "Itinerary Planner" };

export default function Itinerary() {
  return <GlobalItinerary />;
}
