import { Flex } from "@chakra-ui/react";
import React from "react";
import ContainerLayout from "../Layout/ContainerLayout";
import ProjectCard from "./ProjectCard";

const Projects = () => {

  const demo = [
    {
      name: 'Open Fork',
      owner: '@bossoncode',
      description: `Find Open-Source You can contribute to. 
      dolorem inventore alias assumenda quisquam qui repellat eaque illo architecto dolor iur

      `
    },
    {
      name: 'Open Fork',
      owner: '@bossoncode',
      description: `Find Open-Source You can contribute to. 
      dolorem inventore alias assumenda quisquam qui repellat eaque illo architecto dolor iur

      `
    },
    {
      name: 'Open Fork',
      owner: '@bossoncode',
      description: `Find Open-Source You can contribute to. 
      dolorem inventore alias assumenda quisquam qui repellat eaque illo architecto dolor iur

      `
    }
  ];

  return (
    <ContainerLayout>
      <Flex
        alignItems={"center"}
        w="100%"
        wrap="wrap"
        justifyContent={"center"}
        gap={5}
        py={10}
      >
        {demo.map((items, index) => (
          <>
            <ProjectCard
              //  @ts-ignore
              name={items.name}
              owner={items.owner}
              description={items.description}
            />
          </>
        ))}
      </Flex>
    </ContainerLayout>
  );
};

export default Projects;
