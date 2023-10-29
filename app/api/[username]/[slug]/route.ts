import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  try {
    const slug = params.slug;

    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project)
      return NextResponse.json(
        {
          error: "No project found witht the provided slug.",
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
