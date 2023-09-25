import { GITHUB_CLIENT_ID } from "@/lib/secrets";

export async function GET(req: Request) {
  return new Response("Redirecting...", {
    status: 302,
    headers: {
      Location:
        "https://github.com/login/oauth/authorize?client_id=" +
        GITHUB_CLIENT_ID +
        "&scope=user:email",
    },
  });
}
