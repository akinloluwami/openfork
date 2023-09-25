import { JWT_SECRET_KEY } from "@/lib/secrets";
import { verify, TokenExpiredError } from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) return new Response("No token", { status: 401 });

  try {
    const jwt = verify(token.value, JWT_SECRET_KEY!) as { id: string };

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
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return new Response("Token has expired", { status: 401 });
    } else {
      return new Response("Invalid token", { status: 401 });
    }
  }
}
