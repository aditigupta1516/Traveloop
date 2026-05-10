// src/app/(app)/explore/page.tsx
import type { Metadata } from "next";
import { ExplorePage } from "@/features/explore/ExplorePage";

export const metadata: Metadata = { title: "Explore Destinations" };

export default function Explore() {
  return <ExplorePage />;
}
