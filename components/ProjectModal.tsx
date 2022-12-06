import { Box, CloseButton, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const ProjectModal = ({ isOpen, cardClose, projectId }: any) => {
  return (
    <>
      <Box
        w={"100%"}
        m={"auto"}
        position={"absolute"}
        top={0}
        h={"400px"}
        bg={"blue.800"}
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
          <Heading>{projectId}</Heading>
        </Box>
      </Box>
    </>
  );
};

export default ProjectModal;
