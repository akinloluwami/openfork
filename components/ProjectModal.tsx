import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { ProjectAsideProgress, ProjectInfoProgress } from "./Progress";
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
  const [currentUser, setCurrentUser] = useState<any>();

  const getCurrentUser = async () => {
    setCurrentUser((await supabase.auth.getUser()).data.user?.id);
  };
  useEffect(() => {
    getCurrentUser();
  }, [supabase]);
  const fetchProject = async () => {
    setLoading(true);
    let { data: project }: { data: any } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId);
    setProject(project[0]);
    setLoading(false);
  };

  useEffect(() => {
    isOpen && fetchProject();
  }, [projectId]);
  const { onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box className="project-modal-container">
        <Modal
          onClose={onClose}
          // finalFocusRef={btnRef}
          size={["3xl", "5xl", "full"]}
          colorScheme="blackAlpha"
          isOpen={isOpen}
          scrollBehavior={"outside"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton onClick={() => cardClose()} />
            <ModalBody>
              <Box>
                <Flex
                  justify="space-between"
                  // direction="column"
                  className="project-info-wrapper"
                >
                  {loading && (
                    <>
                      <Box flex={1} p={8}>
                        <ProjectInfoProgress />
                      </Box>
                      <ProjectAsideProgress />
                    </>
                  )}
                </Flex>

                {!loading && (
                  <Flex
                    justify="space-between"
                    // direction="column"
                    className="project-info-wrapper"
                  >
                    <Box flex={1} p={8}>
                      <ProjectInfo
                        id={project.id}
                        name={project.name}
                        tagline={project.tagline}
                        github_url={project.github_url}
                        tech_stack={project.tech_stack}
                      />
                    </Box>
                    <ProjectAsideProgress />
                  </Flex>
                )}

                {/* {!loading && } */}
              </Box>

              <ProjectComments postId={projectId} userId={currentUser} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      {/* <Flex align={"center"} justify={"center"}>
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
              <ProjectComments postId={projectId} userId={currentUser} />
            </>
          )}
        </Box>
      </Box>
    </Flex> */}
    </>
  );
};

export default ProjectModal;
