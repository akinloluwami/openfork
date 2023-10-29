import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string; username: string };
  }
) {
  try {
    const slug = params.slug;
    const username = params.username;

    const project = await prisma.project.findUnique({
      where: {
        slug,
        user: {
          username,
        },
      },
    });

    if (!project)
      return NextResponse.json(
        {
          error: "Project not found.",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
