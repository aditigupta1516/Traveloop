// src/app/(app)/settings/page.tsx
import type { Metadata } from "next";
import { SettingsPage } from "@/features/settings/SettingsPage";

export const metadata: Metadata = { title: "Profile & Settings" };

export default function Settings() {
  return <SettingsPage />;
}
