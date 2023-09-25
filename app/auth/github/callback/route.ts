import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/lib/secrets";
import axios from "axios";
import { Octokit } from "octokit";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import setCookies from "@/utils/setCookies";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) return new Response("Unauthorized request1", { status: 401 });

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }
    );

    const accessToken = new URL(response.data).searchParams.get("access_token");

    console.log("====================================");
    console.log("accessToken", accessToken);
    console.log("====================================");

    console.log(accessToken);

    if (accessToken) {
      const octokit = new Octokit({
        auth: accessToken,
      });

      const userResponse = await octokit.request("GET /user");

      const userEmails = await octokit.request("GET /user/emails");

      const user = userResponse.data;
      const email = userEmails.data.find((e) => e.primary)?.email;

      const githubUser = await prisma.github.findUnique({
        where: {
          githubId: user.id,
        },
      });

      const userAccount = await prisma.user.findFirst({
        where: {
          github: githubUser,
        },
      });

      if (userAccount) {
        await setCookies(userAccount.id);
        return redirect("/");
      }

      const newUser = await prisma.user.create({
        data: {
          email: email!,
          name: user.name,
        },
      });

      await prisma.github.create({
        data: {
          githubId: user.id,
          userId: newUser.id,
        },
      });

      await setCookies(newUser.id);
      redirect("/");
    } else {
      return new Response("Unauthorized request", { status: 401 });
    }
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
