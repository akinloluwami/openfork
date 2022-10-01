import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Image, Link } from "@chakra-ui/react";
const ProjectCard: NextPage = () => {
  return (
    <Box p="30px" w="500px" bg="#111" cursor="pointer" borderRadius="30px">
      <Flex align="center" gap="10px">
        <Image src="/avatar.png" width="70px" />
        <Heading as="h3" fontSize="30px">
          <Text fontSize="12px" fontWeight="thin" p="0px 2px">
            <Link> @bossoncode/</Link>
          </Text>
          <Link textDecoration="underline"> Open-Fork</Link>
        </Heading>
      </Flex>
      <Text m="15px 0" fontSize="13px">
        {" "}
        Find Open-Source You can contribute to. dolorem inventore alias
        assumenda quisquam qui repellat eaque illo architecto dolor iur
      </Text>
      {/*  */}
      <Flex gap="10px" align="center">
        <Text fontWeight="bold"> Level: </Text>
        <Flex>
          <Text
            border="1px solid grey"
            p="6px 12px"
            borderRadius="20px"
            fontSize="12px"
            display="block"
          >
            Beginner
          </Text>
        </Flex>
      </Flex>
      <Flex gap="10px" m="10px 0" align="center">
        <Text fontWeight="bold"> Tech-Stack: </Text>
        <Flex>
          <Text
            border="1px solid grey"
            p="6px 12px"
            borderRadius="20px"
            fontSize="12px"
            display="block"
          >
            Typescript
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
