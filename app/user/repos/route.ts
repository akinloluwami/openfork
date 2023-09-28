import { getUserId } from "@/utils/getUserIdFromToken";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const userId = await getUserId();

  if (!userId) return new Response("No user id", { status: 401 });

  const github = await prisma.github.findUnique({
    where: {
      userId,
    },
  });

  const accessToken = github?.accessToken;

  return new Response(accessToken, { status: 200 });
}
