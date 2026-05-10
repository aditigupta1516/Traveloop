import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const tripCount = await prisma.trip.count();
    return NextResponse.json({ 
      success: true, 
      database: "connected", 
      userCount, 
      tripCount 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
