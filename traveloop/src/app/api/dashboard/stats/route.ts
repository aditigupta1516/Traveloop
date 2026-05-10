// src/app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [trips, budgetItems] = await Promise.all([
      prisma.trip.findMany({
        where: { userId },
        include: { stops: true },
      }),
      prisma.budgetItem.findMany({
        where: { trip: { userId } },
      }),
    ]);

    const totalTrips = trips.length;
    const upcomingTrips = trips.filter(t => t.status === "UPCOMING" || t.status === "PLANNING").length;
    const totalSpent = budgetItems.reduce((acc, item) => acc + item.amount, 0);
    const totalBudget = trips.reduce((acc, trip) => acc + (trip.budget || 0), 0);

    const uniqueCountries = new Set(trips.flatMap(t => t.stops.map(s => s.country)).filter(Boolean)).size;

    return NextResponse.json({
      totalTrips,
      upcomingTrips,
      totalSpent,
      totalBudget,
      countriesVisited: uniqueCountries,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
