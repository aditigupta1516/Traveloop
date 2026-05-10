import { MyTripsDashboard } from "@/features/trips/MyTripsDashboard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Planned Trips" };

export default function PlannedTrips() {
  return <MyTripsDashboard statusFilter="PLANNED" />;
}
