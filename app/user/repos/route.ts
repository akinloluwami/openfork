import { getUserId } from "@/utils/getUserIdFromToken";
import prisma from "@/lib/prisma";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userId = await getUserId();

  if (!userId) return new Response("No user id", { status: 401 });

  const github = await prisma.github.findUnique({
    where: {
      userId,
    },
  });

  const accessToken = github?.accessToken;

  const octokit = new Octokit({
    auth: accessToken,
  });

  const { data } = await octokit.request("GET /user");
  const username = data.login;

  const userRepos = await octokit.repos.listForUser({
    username,
    per_page: 100,
  });

  const orgs = await octokit.request("GET /user/orgs");

  let userOrgsRepos: any = [
    {
      org: username,
      repos: userRepos.data.map((repo: any) => ({
        name: repo.name,
        html_url: repo.html_url,
        full_name: repo.full_name,
        description: repo.description,
      })),
    },
  ];

  async function fetchOrgRepos() {
    for (const org of orgs.data) {
      const reposResponse = await octokit.request(
        `GET /orgs/${org.login}/repos`
      );
      const repos = reposResponse.data.map((repo: any) => ({
        name: repo.name,
        html_url: repo.html_url,
        full_name: repo.full_name,
        description: repo.description,
      }));

      userOrgsRepos.push({
        org: org.login,
        repos: repos,
      });
    }
  }

  await fetchOrgRepos();

  return NextResponse.json(userOrgsRepos, { status: 200 });
}
