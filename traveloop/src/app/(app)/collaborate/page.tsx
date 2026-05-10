// src/app/(app)/collaborate/page.tsx
import type { Metadata } from "next";
import { CollaborateDashboard } from "@/features/community/CollaborateDashboard";

export const metadata: Metadata = { title: "Collaborate" };

export default function Collaborate() {
  return <CollaborateDashboard />;
}
