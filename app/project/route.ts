import { ProjectProps } from "@/types";
import { getUserId } from "@/utils/getUserIdFromToken";
import validator from "validator";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId)
      return NextResponse.json({ error: "No user id" }, { status: 401 });

    const { name, description, website, repository, techStack } =
      (await request.json()) as ProjectProps;

    if (!name)
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );

    if (!description)
      return NextResponse.json(
        { error: "Project description is required" },
        { status: 400 }
      );

    if (website && !validator.isURL(website))
      return NextResponse.json(
        { error: "Invalid website URL" },
        { status: 400 }
      );

    if (!repository)
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );

    if (!validator.isURL(repository) || !repository.includes("github.com"))
      return NextResponse.json(
        { error: "Invalid repository URL" },
        { status: 400 }
      );

    if (techStack.length === 0)
      return NextResponse.json(
        { error: "Tech stack is required" },
        { status: 400 }
      );

    const projectExists = await prisma.project.findUnique({
      where: { repository },
    });

    if (projectExists)
      return NextResponse.json(
        { error: "Project already exists" },
        { status: 409 }
      );

    let slug = name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

    const slugExists = await prisma.project.findUnique({
      where: { slug },
    });

    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        slug,
        description,
        website,
        repository,
        techStack,
        userId,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello world" }, { status: 200 });
}
