import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ProjectProps {
  name: string;
  upvotes?: number;
  slug?: string;
  comments?: number;
  image?: string;
}

const UserProjectCard = ({ name, upvotes, slug, comments }: ProjectProps) => {
  return (
    <Flex>
      <Flex>
        <Avatar size={"md"} />
        <Text>{name}</Text>
      </Flex>
    </Flex>
  );
};

export default UserProjectCard;
