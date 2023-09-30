import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/api/getProject";
import { ProjectProps } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export default async function Project({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project: ProjectProps = await getProject(slug);

  return (
    <div>
      <Head>
        <title>{project.name} • Openfork</title>
      </Head>
      <div className="max-w-[800px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <div className="h-20 w-20 bg-orange-500 rounded-lg"></div>
          <h1 className="text-4xl font-semibold">{project.name}</h1>
          <p className="text-gray-500 text-lg">{project.description}</p>

          <Link
            href={project.repository}
            target="_blank"
            className="inline-flex gap-1 items-center hover:underline"
          >
            <SiGithub /> Visit GitHub Repository
          </Link>
        </div>
      </div>
    </div>
  );
}
