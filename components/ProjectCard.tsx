import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Link, Avatar } from "@chakra-ui/react";
import StackTag from "./Tag";
import {
  SiChakraui,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
const ProjectCard: NextPage = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      p={0.5}
      w="500px"
      bg={"transparent"}
      cursor="pointer"
      borderRadius={"md"}
      _hover={{
        background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
      }}
    >
      <Box p={6} w="500px" bg="#111" borderRadius={"md"}>
        <Flex align="center" gap="10px">
          <Avatar size={"lg"} />
          <Heading as="h3" fontSize="30px">
            <Link textDecoration="underline"> Open-Fork</Link>
            <Text fontSize="12px" fontWeight="thin" py={2}>
              @bossoncode
            </Text>
          </Heading>
        </Flex>
        <Text m="15px 0" fontSize="13px">
          {" "}
          Find Open-Source You can contribute to. dolorem inventore alias
          assumenda quisquam qui repellat eaque illo architecto dolor iur
        </Text>
        {/*  */}
        <Flex gap="10px" m="10px 0" align="center">
          <StackTag stackName={"Chakra UI"} icon={SiChakraui} />
          <StackTag stackName={"Supabase"} icon={SiSupabase} />
          <StackTag stackName={"NextJS"} icon={SiNextdotjs} />
          <StackTag stackName={"TypeScript"} icon={SiTypescript} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProjectCard;
