import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import ProjectComments from "./ProjectComments";
import ProjectInfo from "./ProjectInfo";

interface upvoteProps {
  user_id: string;
}

interface ProjectProps {
  id: number;
  name: string;
  user?: string;
  owner?: string;
  description: string;
  imgSrc?: any;
  onOpen?: any;
  upvotes?: upvoteProps[];
  upvoteProject?: any;
  github_url?: string;
  tech_stack?: any;
  isUpvoting?: number;
  slug: string;
}

const ProjectModal = ({ isOpen, cardClose, projectId }: any) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>({});

  const fetchProject = async () => {
    setLoading(true);
    let { data: project }: { data: any } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId);
    console.log(project[0]);
    setProject(project[0]);
    setLoading(false);
  };

  useEffect(() => {
    isOpen && fetchProject();
  }, [projectId]);

  return (
    <Flex align={"center"} justify={"center"}>
      <Box
        h={"fit-content"}
        w={"100%"}
        m={"auto"}
        position={"absolute"}
        top={0}
        bg={"#0a0a0a"}
        zIndex={"modal"}
        display={isOpen ? "flex" : "none"}
        borderRadius={"xl"}
        flexDirection={"column"}
      >
        <CloseButton
          size={"lg"}
          onClick={() => {
            cardClose();
          }}
        />

        <Box w={"90%"} mx={"auto"}>
          {loading && <Spinner size={"md"} />}
          {!loading && isOpen && (
            <>
              <ProjectInfo
                id={project.id}
                name={project.name}
                tagline={project.tagline}
                github_url={project.github_url}
                tech_stack={project.tech_stack}
              />
              <ProjectComments postId={projectId} userId={""} />
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default ProjectModal;
