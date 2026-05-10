// src/app/(app)/trips/[id]/page.tsx
import type { Metadata } from "next";
import { ItineraryBuilder } from "@/features/itinerary/ItineraryBuilder";

export const metadata: Metadata = { title: "Trip Itinerary" };

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ItineraryBuilder tripId={id} />;
}
