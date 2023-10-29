import Upvotebutton from "@/components/upvote-button";
import { getProject } from "@/lib/api/getProject";
import { DOMAIN } from "@/lib/constants";
import { ProjectProps } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export async function generateMetadata({
  params: { username, slug },
}: {
  params: { username: string; slug: string };
}) {
  const project: ProjectProps = await getProject({
    slug,
    username,
  });
  return {
    title: `${project.name} • Openfork`,
    description: project.description,
    openGraph: {
      url: `${DOMAIN}/p/${project.slug}`,
      title: `${project.name} • Openfork`,
      description: project.description,
      // images: [
      //   {
      //     url: `https://openfork.dev${project.repository}/banner.png`,
      //   },
      // ],
    },
  } as Metadata;
}

export default async function Project({
  params: { username, slug },
}: {
  params: { username: string; slug: string };
}) {
  const project: ProjectProps = await getProject({
    slug,
    username,
  });

  return (
    <div>
      <div className="max-w-[800px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <div className="h-20 w-20 bg-orange-500 rounded-lg"></div>

          <h1 className="text-4xl font-semibold mt-3">{project.name}</h1>
          <p className="text-gray-500 text-lg">{project.description}</p>
          <div className="flex gap-3 my-2">
            <p className="font-semibold">Built with:</p>
            {project.techStack.map((stack, i) => (
              <p key={i}>{stack}</p>
            ))}
          </div>

          <Link
            href={project.repository}
            target="_blank"
            className="inline-flex gap-1 items-center hover:underline w-fit"
          >
            <SiGithub /> Visit GitHub Repository
          </Link>
          <Upvotebutton projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
