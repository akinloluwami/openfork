import { Box, Flex } from "@chakra-ui/react";
// import { NextPage } from "next";
import React from "react";

interface Props {
  name?: string;
  github?: string;
  description?: string;
  website?: any;
}

const Project = ({ name, github, description, website }: Props) => {
  return <Box>{name}</Box>;
};

export default Project;
