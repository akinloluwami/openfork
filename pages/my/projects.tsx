import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectCard";
import { supabase } from "../../utils/supabaseClient";

const Projects = () => {
  const [myProjects, setMyProject] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user", (await supabase.auth.getUser()).data.user?.id);
      setMyProject(projects);
      console.log(projects);
    }

    fetchProjects();
  }, []);

  return (
    <Box>
      <Header />
      <Flex justify={"center"}>
        <Text fontSize={"3xl"} fontWeight={"semibold"}>
          My projects
        </Text>
      </Flex>
      <Grid
        mt={20}
        alignItems={"center"}
        w="100%"
        templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
        justifyContent={"center"}
        gap={5}
        py={10}
      >
        {myProjects?.map((project: any) => (
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
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
