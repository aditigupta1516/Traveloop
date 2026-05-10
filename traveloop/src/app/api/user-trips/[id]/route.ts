import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;

  try {
    // Verify ownership
    const trip = await prisma.trip.findFirst({
      where: {
        id,
        user: { email: session.user.email }
      }
    });

    if (!trip) return NextResponse.json({ error: "Trip not found or unauthorized" }, { status: 404 });

    await prisma.trip.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Trip deleted successfully" });
  } catch (error: any) {
    console.error("Trip deletion error:", error);
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 });
  }
}
