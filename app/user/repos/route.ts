import { getUserId } from "@/utils/getUserIdFromToken";

export async function GET(request: Request) {
  const userId = await getUserId();

  if (!userId) return new Response("No user id", { status: 401 });

  return new Response(userId, { status: 200 });
}
