import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectCard";
import ContainerLayout from "../../layouts/ContainerLayout";
import { supabase } from "../../utils/supabaseClient";

const Projects = () => {
  const [myProjects, setMyProject] = useState<any>([]);

  useEffect(() => {
    async function fetchProjects() {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user", (await supabase.auth.getUser()).data.user?.id);
      setMyProject(projects);
    }
    fetchProjects();
  }, []);

  const isLoggedIn = async () => {
    const check = await supabase.auth.getUser();
    if (check.data.user === null) {
      Router.push("/");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <ContainerLayout>
      <Head>
        <title>My Projects | Openfork</title>
      </Head>
      <Box>
        <Header />
        <Flex justify={"center"}>
          <Text fontSize={"3xl"} fontWeight={"semibold"}>
            My projects
          </Text>
        </Flex>
        <Center mt={10}>
          <Link href={"/projects/new"}>
            <Button>Publish new project</Button>
          </Link>
        </Center>
        <Grid
          mt={5}
          alignItems={"center"}
          w="100%"
          templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
          justifyContent={"center"}
          gap={5}
          py={10}
        >
          {myProjects.length < 1 && (
            <Center>
              <Box>
                <Text my={5} fontSize={"4xl"}>
                  You don't have any projects yet.
                </Text>
                <Center>
                  <Link href={"/projects/new"}>
                    <Button>Publish your first project</Button>
                  </Link>
                </Center>
              </Box>
            </Center>
          )}

          {myProjects?.map((project: any) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              owner={project.user}
              tagline={project.tagline}
              github={project.github_url}
              techStack={project.tech_stack}
              slug={project.slug}
              // onOpen={() => {
              //   cardCLick(project.name);
              // }}
              upvotes={project.upvotes === null ? [] : project.upvotes}
            />
          ))}
        </Grid>
      </Box>
    </ContainerLayout>
  );
};

export default Projects;
