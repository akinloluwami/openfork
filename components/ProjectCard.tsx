import type { NextPage } from "next";
import Tag from "./Tag";
import { Flex, Box, Heading, Text, Link, Avatar } from "@chakra-ui/react";
const ProjectCard: NextPage = () => {
  return (
    <Box p="30px" w="500px" bg="#111" cursor="pointer" borderRadius={"md"}>
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
        <Text fontWeight="bold"> Tech-Stack: </Text>
        <Flex>
          <Tag>Typescript</Tag>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
