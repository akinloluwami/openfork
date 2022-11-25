import { Button, Center, Grid, Text, useDisclosure } from "@chakra-ui/react";
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

interface ProjectProps {
  id?: number;
  name: string;
  owner?: string;
  description: string;
  imgSrc?: any;
  onOpen?: any;
  upvotes?: any;
  upvoteProject?: any;
  github?: string;
  techStack?: any;
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

  async function fetchProjects() {
    let { data: projects }: { data: any } = await supabase
      .from("projects")
      .select("*")
      .range(openProjects.length, openProjects.length + 4);

    if (projects && projects!.length < 5) {
      setProjectsEnd(true);
    }
   projects && setOpenProjects([...openProjects, ...projects]);
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

  const upvoteProject = async (id: number, upvotes: any) => {
    const currentUserId = (await supabase.auth.getUser()).data.user?.id;

    const upvoted = upvotes.find(
      (upvote: any) => upvote.userId === currentUserId
    );

    if (upvoted) {
      setIsUpvoting(id);
      const newUpvotes = upvotes.filter(
        (upvote: any) => upvote.userId !== currentUserId
      );
      const { data, error } = await supabase
        .from("projects")
        .update({
          upvotes: newUpvotes,
        })
        .eq("id", id);
      const newOpenProjects = openProjects.map((project: ProjectProps) => {
        if (project.id === id) {
          return {
            ...project,
            upvotes: newUpvotes,
          };
        }
        return project;
      });
      setOpenProjects(newOpenProjects);
      setIsUpvoting(0);
    } else {
      const upvoteData = {
        userId: (await supabase.auth.getUser()).data.user?.id,
        created_at: new Date(),
      };
      setIsUpvoting(id);
      const { data, error } = await supabase
        .from("projects")
        .update({
          upvotes: [...upvotes, upvoteData],
        })
        .eq("id", id);
      const newOpenProjects = openProjects.map((project: ProjectProps) => {
        if (project.id === id) {
          return {
            ...project,
            upvotes: [...upvotes, upvoteData],
          };
        }
        return project;
      });
      setOpenProjects(newOpenProjects);
      setIsUpvoting(0);
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
          mt={20}
          alignItems={"center"}
          w="100%"
          templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
          justifyContent={"center"}
          gap={5}
          py={10}
        >
          {openProjects.length < 1 && (
            <Center>
              <Text fontSize={"3xl"}>No projects</Text>
            </Center>
          )}
          {openProjects?.map((project: any) => (
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
        <Center my={10}>
          {projectsEnd ? (
            <Text>You have reached the end...</Text>
          ) : (
            <Button onClick={fetchProjects}>Load more...</Button>
          )}
        </Center>
      </>
    </ContainerLayout>
  );
};

export default Projects;
