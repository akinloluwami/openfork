import type { NextPage } from "next";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link,
  Input,
} from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { FaGithub, FaSearch } from "react-icons/fa";
const Hero: NextPage = () => {
  return (
    <Box>
      <Flex
        justify="center"
        textAlign="center"
        align="center"
        p="5%"
        direction="column"
      >
        <Heading fontSize="50px" maxW="600px" m="auto">
          Find Open-Source You can contribute to.
        </Heading>
        <Text maxW="600px" m="20px auto" fontSize="13px">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          dolorem inventore alias assumenda quisquam qui repellat eaque illo
          architecto dolor iur
        </Text>

        <Button fontSize="13px" bg="darkorange">
          <FaGithub /> <Text mx="5px"> Sign in with Github</Text>
        </Button>
      </Flex>

      {/* // search */}
      <Box maxW="500px" m="auto">
        <Flex align="center" gap="10px" fontWeight="bold" fontSize="13px">
          <Link>All</Link>
          <Link>Popular</Link>
          <Link>Latest</Link>
        </Flex>
        <Flex
          m="10px auto"
          fontSize="25px"
          border="1px solid grey"
          align="center"
          p="15px 20px"
          borderRadius="15px"
        >
          <FaSearch />
          <Input
            outline="none !important"
            border="none"
            type="search"
            placeholder="Type here to search"
          />
        </Flex>
      </Box>

      {/*  project card lists*/}
      <Flex m="40px 20px" justify="center" gap="20px">
        <ProjectCard />
        <ProjectCard />
      </Flex>
    </Box>
  );
};

export default Hero;
