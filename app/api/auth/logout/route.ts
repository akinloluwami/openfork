import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cook = cookies();

    cook.delete("access_token");
    cook.delete("refresh_token");
    cook.delete("openfork_user");

    return new Response("Logout successfull", { status: 200 });
  } catch (error) {
    return new Response("Logout failed", { status: 500 });
  }
}
