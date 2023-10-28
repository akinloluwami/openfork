import { GITHUB_CLIENT_ID } from "@/lib/secrets";

export async function GET(req: Request) {
  const scope = "user:email read:org";

  const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${scope}`;

  return new Response("Redirecting...", {
    status: 302,
    headers: {
      Location: authorizationUrl,
    },
  });
}
