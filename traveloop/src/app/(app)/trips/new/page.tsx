// src/app/(app)/trips/new/page.tsx
import type { Metadata } from "next";
import { CreateTripWizard } from "@/features/trips/CreateTripWizard";

export const metadata: Metadata = { title: "Create New Trip" };

export default function NewTripPage() {
  return <CreateTripWizard />;
}
