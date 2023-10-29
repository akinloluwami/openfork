import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            username: true,
            isVerified: true,
          },
        },
        _count: {
          select: {
            upvotes: true,
          },
        },
      },
    });

    return NextResponse.json(
      projects,

      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Interval server error.",
      },
      {
        status: 500,
      }
    );
  }
}
