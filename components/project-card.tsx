import { Avatar } from "./ui/avatar";
import Upvotebutton from "./upvote-button";

const ProjectCard = ({
  project,
}: {
  project: {
    id: string;
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
  const { id, name, description, slug, upvotes, user } = project;
  const { username, isVerified } = user;

  return (
    <div className="border-2 border-black rounded-lg w-[300px] p-2">
      <h2 className="font-semibold text-xl">{name}</h2>
      <p className="mt-3">{description}</p>
      <div className="flex mt-3">
        <p className="font-semibold text-sm">{username}</p>
      </div>
      <div className="mt-10">
        <Upvotebutton projectId={id} />
      </div>
    </div>
  );
};

export default ProjectCard;
