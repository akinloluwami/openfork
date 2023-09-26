import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_SECRET_KEY } from "@/lib/secrets";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("refresh_token");

    if (!token)
      return new Response(
        "Unauthorized request. Refresh token is not present.",
        { status: 401 }
      );

    const jwt = verify(token.value, process.env.JWT_SECRET_KEY!) as {
      id: string;
    };

    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token: token.value,
        userId: jwt.id,
      },
    });

    if (!refreshToken)
      return new Response("Unauthorized request.", { status: 401 });

    const hasTokenExpired = refreshToken.expiresAt < new Date();

    if (hasTokenExpired) {
      await prisma.refreshToken.delete({
        where: {
          token: token.value,
        },
      });
      return new Response("Unauthorized request. Token has expired.", {
        status: 401,
      });
    }

    const accessToken = sign({ id: jwt.id }, JWT_SECRET_KEY!);

    return new Response("Token has been refreshed successfully", {
      status: 200,
      headers: {
        Location: "/",
        "Set-Cookie": `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Lax; Secure`,
      },
    });
  } catch (error) {
    return new Response("Internal sever error.", { status: 500 });
  }
}
