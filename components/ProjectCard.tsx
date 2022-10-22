import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Avatar } from "@chakra-ui/react";
import StackTag from "./Tag";
import {
  SiChakraui,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
import Link from "next/link";

interface Props {
  name: string;
  owner?: string;
  description: string;
  imgSrc?: any;
  onOpen?: any;
}

const ProjectCard = ({ name, owner, description, imgSrc, onOpen }: Props) => {
  const truncate = (str: string) => {
    const maxLength = 35;
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  };

  return (
    <Link href={"?projects/pppp"} as={`/projects/${name?.toLowerCase()}`}>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        p={0.5}
        maxW={["90vw", "400px"]}
        bg={"transparent"}
        cursor="pointer"
        borderRadius={"md"}
        _hover={{
          background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
        }}
        onClick={onOpen}
      >
        <Box p={6} w="" bg="#111" borderRadius={"md"}>
          <Flex align="center" gap="10px">
            <Avatar size={["md"]} src={imgSrc} />
            <Heading as="h3" fontSize="30px">
              <Text fontSize={"0.7em"}>{name}</Text>

              <Text fontSize="14px" fontWeight="thin" py={2}>
                {owner}
              </Text>
            </Heading>
          </Flex>
          <Text m="15px 0" fontSize="15px">
            {" "}
            {truncate(description)}
          </Text>
          {/*  */}
          <Flex gap="10px" m="10px 0" align="center" wrap="wrap">
            <StackTag stackName={"Chakra UI"} icon={SiChakraui} />
            <StackTag stackName={"Supabase"} icon={SiSupabase} />
            <StackTag stackName={"NextJS"} icon={SiNextdotjs} />
            <StackTag stackName={"TypeScript"} icon={SiTypescript} />
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
};

export default ProjectCard;
