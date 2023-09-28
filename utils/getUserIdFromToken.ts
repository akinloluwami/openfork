import { JWT_SECRET_KEY } from "@/lib/secrets";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserId() {
  const token = cookies().get("access_token");

  if (!token) return null;

  const decoded = verify(token.value, JWT_SECRET_KEY!) as { id: string };

  return decoded.id;
}
