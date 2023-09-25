import { GITHUB_CLIENT_ID } from "@/lib/secrets";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`
  );
}
