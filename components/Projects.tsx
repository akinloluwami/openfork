import { Flex } from "@chakra-ui/react";
import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} gap={5} py={10}>
      <ProjectCard />
      <ProjectCard />
    </Flex>
  );
};

export default Projects;
