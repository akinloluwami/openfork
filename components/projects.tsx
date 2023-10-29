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
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
