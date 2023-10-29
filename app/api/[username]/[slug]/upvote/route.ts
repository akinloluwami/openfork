import { getUserId } from "@/utils/getUserIdFromToken";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { slug: string; username: string };
  }
) {
  try {
    const userId = await getUserId();

    if (!userId)
      return NextResponse.json({ error: "No user id" }, { status: 401 });

    const project = await prisma.project.findUnique({
      where: {
        slug: params.slug,
        user: {
          username: params.username,
        },
      },
    });

    if (!project)
      return NextResponse.json({ error: "No project found." }, { status: 404 });

    const payload = {
      projectId: project.id,
      upvoterId: userId,
    };

    const hasUpvoted = await prisma.upvote.findFirst({
      where: payload,
    });

    if (hasUpvoted) {
      await prisma.upvote.delete({
        where: {
          id: hasUpvoted.id,
        },
      });
    } else {
      await prisma.upvote.create({
        data: payload,
      });
    }

    return NextResponse.json(
      {
        message: `Project has been ${hasUpvoted ? "un" : ""}upvoted`,
      },
      {
        status: hasUpvoted ? 200 : 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
