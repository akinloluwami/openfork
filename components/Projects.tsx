import {
  Button,
  Center,
  Grid,
  Text,
  useDisclosure,
  usePopoverStyles,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ContainerLayout from "../Layout/ContainerLayout";
import ProjectCard from "./ProjectCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { supabase } from "../utils/supabaseClient";
import { ProjectProgress } from "./Progress";

interface upvoteProps {
  user_id: string;
}

interface ProjectProps {
  id?: number;
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
}

const Projects = () => {
  const [openProjects, setOpenProjects] = useState<any>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = Router;

  const initPageTitle =
    "Openfork - Open-source projects you can actually contribute to.";
  const [pageTitle, setPageTitle] = useState(initPageTitle);
  const [projectsEnd, setProjectsEnd] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState<number>(0);
  const [isProjectLoading, setisLoading] = useState(true);

  async function getUpvotes(projectId: number) {
    return await supabase
      .from("project_upvotes")
      .select("*")
      .eq("project_id", projectId);
  }

  async function fetchProjects() {
    setisLoading(true);
    let { data: projects }: { data: any } = await supabase
      .from("projects")
      .select("*")
      .range(openProjects.length, openProjects.length + 4);

    if (projects && projects!.length < 5) {
      setProjectsEnd(true);
    }
    const newOpenProjects = async () => {
      const arr = [];
      if (projects) {
        for (let i = 0; i < projects.length; i++) {
          const upvotes = await getUpvotes(projects[i].id!);
          arr.push({
            ...projects[i],
            upvotes: upvotes.data,
          });
        }
      }
      return arr;
    };

    const newProjects = await newOpenProjects();
    projects && setOpenProjects([...openProjects, ...newProjects]);
    setisLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const cardCLick = (title: string) => {
    onOpen();
    setPageTitle(`${title} - Openfork`);
    router.push(`/?projects/${title.toLowerCase()}`, undefined, {
      shallow: true,
    });
  };
  const cardClose = () => {
    setPageTitle(initPageTitle);
    onClose();
    router.push("/");
  };

  const upvoteProject = async (id: number, upvotes: upvoteProps[]) => {
    const currentUser = (await supabase.auth.getUser()).data.user?.id;

    function checkUpvoted(user_id: string) {
      return upvotes.some(function (project) {
        return project.user_id === user_id;
      });
    }
    if (checkUpvoted(currentUser!)) {
      await supabase
        .from("project_upvotes")
        .delete()
        .eq("user_id", currentUser);
    } else {
      await supabase
        .from("project_upvotes")
        .insert([{ project_id: id, user_id: currentUser }]);
    }
  };

  return (
    <ContainerLayout>
      <>
        <Head>{/* <title>{pageTitle}</title> */}</Head>
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
                vitae tenetur laudantium pariatur asperiores distinctio, magni
                est numquam tempore ullam nisi error, cupiditate autem dolore?
                Tenetur commodi enim veritatis odio, doloribus soluta
                reprehenderit optio repellendus inventore cum omnis eius
                recusandae.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  cardClose();
                }}
              >
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
        <Grid
          alignItems={"center"}
          w="100%"
          templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
          justifyContent={"center"}
          gap={5}
        >
          {openProjects?.map((project: ProjectProps) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              owner={project.user}
              description={project.description}
              github={project.github_url}
              techStack={project.tech_stack}
              // onOpen={() => {
              //   cardCLick(project.name);
              // }}
              upvotes={project.upvotes === null ? [] : project.upvotes}
              upvoteProject={upvoteProject}
              isUpvoting={isUpvoting}
            />
          ))}
        </Grid>
        {isProjectLoading ? (
          <ProjectProgress />
        ) : (
          openProjects.length < 1 && (
            <Center>
              <Text fontSize={"xl"}>No projects</Text>
            </Center>
          )
        )}
        <Center my={10}>
          {projectsEnd ? (
            <Text>You have reached the end...</Text>
          ) : (
            openProjects.length > 0 &&
            !isProjectLoading && (
              <Button onClick={fetchProjects}>Load more...</Button>
            )
          )}
        </Center>
      </>
    </ContainerLayout>
  );
};

export default Projects;
