import { getUserId } from "@/utils/getUserIdFromToken";

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
  } catch (error) {}
}
