import { getProjects } from "@/lib/api/getProjects";
import ProjectCard from "./project-card";

interface ProjectProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  upvotes: number;
  user: {
    username: string;
    isVerified: boolean;
  };
}

const Projects = async () => {
  const projects: ProjectProps[] = await getProjects();
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center py-10">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
