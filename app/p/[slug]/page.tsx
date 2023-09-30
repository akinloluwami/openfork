import { getProject } from "@/lib/api/getProject";
import { ProjectProps } from "@/types";

export default async function Project({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project: ProjectProps = await getProject(slug);

  return <div>{project.repository}</div>;
}
