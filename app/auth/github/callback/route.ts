import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/lib/secrets";
import axios from "axios";
import { Octokit } from "octokit";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import generateTokens from "@/utils/generateTokens";
import dayjs from "dayjs";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) return new Response("Unauthorized request", { status: 401 });

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }
    );

    const params = new URLSearchParams(response.data);

    const accessToken = params.get("access_token");

    if (!accessToken)
      return new Response("Unauthorized request", { status: 401 });

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
      return new Response("Log in successful. Redirecting...", {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie": [
            `refresh_token=${
              (await generateTokens(userAccount.id)).refresh_token
            }; HttpOnly; Path=/; Max-Age=${dayjs()
              .add(90, "d")
              .diff(dayjs(), "seconds")}; SameSite=Lax; Secure`,
            `access_token=${
              (await generateTokens(userAccount.id)).access_token
            }; HttpOnly; Path=/; Max-Age=${dayjs()
              .add(15, "minutes")
              .diff(dayjs(dayjs(), "seconds"))}; SameSite=Lax; Secure`,
          ].join(", "),
        },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email: email!,
        name: user.name,
        username: user.login,
        githubUrl: user.html_url,
        image: user.avatar_url,
      },
    });

    await prisma.github.create({
      data: {
        githubId: user.id,
        userId: newUser.id,
      },
    });

    return new Response("Account created. Redirecting...", {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": [
          `refresh_token=${
            (await generateTokens(newUser.id)).refresh_token
          }; HttpOnly; Path=/; Max-Age=${dayjs()
            .add(90, "d")
            .diff(dayjs(), "seconds")}; SameSite=Lax; Secure`,
          `access_token=${
            (await generateTokens(newUser.id)).access_token
          }; HttpOnly; Path=/; Max-Age=${dayjs()
            .add(15, "minutes")
            .diff(dayjs(dayjs(), "seconds"))}; SameSite=Lax; Secure`,
        ].join(", "),
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
