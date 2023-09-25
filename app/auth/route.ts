import { JWT_SECRET_KEY } from "@/lib/secrets";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) return new Response("No token", { status: 401 });

  const jwt = verify(token.value, JWT_SECRET_KEY!);

  console.log(jwt);

  return new Response("Auth!", {
    status: 200,
  });
}
