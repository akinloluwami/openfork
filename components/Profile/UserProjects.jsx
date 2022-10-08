import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import AddNewProject from "./AddNewProject";

const UserProjects = () => {
  return (
    <Flex justify={"center"} align={"center"}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Text textAlign={"center"}>You don't have any project.</Text>
        <Center>
          <AddNewProject />
        </Center>
      </Flex>
    </Flex>
  );
};

export default UserProjects;
