import { JWT_SECRET_KEY } from "@/lib/secrets";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) return new Response("No token", { status: 401 });

  const jwt = verify(token.value, JWT_SECRET_KEY!) as { id: string };

  console.log(jwt);

  const user = await prisma.user.findUnique({
    where: { id: jwt.id },
  });

  if (!user) return new Response("Invalid user id", { status: 401 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    isVerified: user.isVerified,
    image: user.image,
    github: user.githubUrl,
  });
}
