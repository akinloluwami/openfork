const ProjectCard = ({
  project,
}: {
  project: {
    name: string;
    slug: string;
    description: string;
    upvotes: number;
    user: {
      username: string;
      isVerified: boolean;
    };
  };
}) => {
  const { name, description, slug, upvotes, user } = project;
  const { username, isVerified } = user;

  return <div>ProjectCard</div>;
};

export default ProjectCard;
