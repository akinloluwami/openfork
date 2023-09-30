import { NewProjectProps } from "@/types";
import { getUserId } from "@/utils/getUserIdFromToken";
import validator from "validator";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userId = await getUserId();

  if (!userId) return new Response("No user id", { status: 401 });

  const { name, description, website, repository, techStack } =
    (await request.json()) as NewProjectProps;

  if (!name) return new Response("Project name is required", { status: 400 });

  if (!description)
    return new Response("Project description is required", { status: 400 });

  if (website && !validator.isURL(website))
    return new Response("Invalid website URL", {
      status: 400,
    });

  if (!repository)
    return new Response("Repository URL is required", { status: 400 });

  if (!validator.isURL(repository) || !repository.includes("github.com"))
    return new Response("Invalid repository URL", {
      status: 400,
    });

  if (techStack.length === 0)
    return new Response("Tech stack is required", { status: 400 });

  const newProject = await prisma.project.create({
    data: {
      name,
      description,
      website,
      repository,
      techStack,
      userId,
    },
  });

  return NextResponse.json({ success: true, newProject });
}

export async function GET() {
  return new Response("Hello world", { status: 200 });
}
