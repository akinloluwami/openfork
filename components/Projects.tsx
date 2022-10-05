import {  Grid } from "@chakra-ui/react";
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
      <Grid
        alignItems={"center"}
        w="100%"
        templateColumns={'repeat(auto-fit, minmax(350px, 1fr))'}
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
      </Grid>
    </ContainerLayout>
  );
};

export default Projects;
