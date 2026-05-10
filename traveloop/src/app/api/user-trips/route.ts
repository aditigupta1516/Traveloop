import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const trips = await prisma.trip.findMany({
    where: {
      user: { email: session.user.email }
    },
    orderBy: { startDate: 'desc' }
  });

  return NextResponse.json(trips);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    const trip = await prisma.trip.create({
      data: {
        title: data.title,
        description: data.notes,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        coverImage: data.coverImage,
        status: data.status || 'PLANNING',
        isPublic: data.visibility === 'PUBLIC',
        userId: user.id,
      }
    });

    return NextResponse.json(trip);
  } catch (error: any) {
    console.error("Trip creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create trip" }, { status: 500 });
  }
}
