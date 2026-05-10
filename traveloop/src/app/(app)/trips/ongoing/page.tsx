import { MyTripsDashboard } from "@/features/trips/MyTripsDashboard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ongoing Trips" };

export default function OngoingTrips() {
  return <MyTripsDashboard statusFilter="ONGOING" />;
}
