import { Button, Grid, Text, useDisclosure } from "@chakra-ui/react";
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
  name: string;
  description: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<any>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = Router;
  const initPageTitle =
    "Openfork - Open-source projects you can actually contribute to.";
  const [pageTitle, setPageTitle] = useState(initPageTitle);

  useEffect(() => {
    async function fetchProjects() {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*");
      setProjects(projects);
    }

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
      const newUpvotes = upvotes.filter(
        (upvote: any) => upvote.userId !== currentUserId
      );
      const { data, error } = await supabase
        .from("projects")
        .update({
          upvotes: newUpvotes,
        })
        .eq("id", id);
    } else {
      const { data, error } = await supabase
        .from("projects")
        .update({
          upvotes: [
            ...upvotes,
            {
              userId: (await supabase.auth.getUser()).data.user?.id,
              created_at: new Date(),
            },
          ],
        })
        .eq("id", id);
    }
  };

  return (
    <ContainerLayout>
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Modal isOpen={isOpen} onClose={onClose}>
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
        </Modal>
        <Grid
          mt={20}
          alignItems={"center"}
          w="100%"
          templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
          justifyContent={"center"}
          gap={5}
          py={10}
        >
          {projects?.map((project: any) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              owner={project.user}
              description={project.description}
              // onOpen={() => {
              //   cardCLick(project.name);
              // }}
              upvotes={project.upvotes === null ? [] : project.upvotes}
              upvoteProject={upvoteProject}
            />
          ))}
        </Grid>
      </>
    </ContainerLayout>
  );
};

export default Projects;
