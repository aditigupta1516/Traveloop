// src/app/(app)/dashboard/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardContent } from "@/features/dashboard/DashboardContent";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  return <DashboardContent user={session!.user!} />;
}
