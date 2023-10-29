const ProjectCard = ({
  name,
  slug,
  description,
  upvotes,
  user,
}: {
  name: string;
  slug: string;
  description: string;
  upvotes: number;
  user: {
    username: string;
    isVerified: boolean;
  };
}) => {
  return <div>ProjectCard</div>;
};

export default ProjectCard;
