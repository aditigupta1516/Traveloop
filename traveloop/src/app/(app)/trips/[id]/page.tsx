// src/app/(app)/trips/[id]/page.tsx
import type { Metadata } from "next";
import { ItineraryBuilder } from "@/features/itinerary/ItineraryBuilder";

export const metadata: Metadata = { title: "Trip Itinerary" };

export default function TripPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch trip details from Prisma here
  // const trip = await prisma.trip.findUnique(...)
  return <ItineraryBuilder tripId={params.id} />;
}
