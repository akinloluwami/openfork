import type { NextPage } from "next";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link,
  Input,
  Center,
} from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { FaGithub, FaSearch } from "react-icons/fa";
import { gradient } from "../styles/gradient";
const Hero: NextPage = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"flex-start"}
      height={"80vh"}
      direction={"column"}
      mt={10}
    >
      <Box>
        <Heading fontSize="50px" maxW="600px" m="auto" textAlign={"center"}>
          Open-source projects you can{" "}
          <span
          // style={{
          //   backgroundClip: "text",
          //   WebkitBackgroundClip: "text",
          //   background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
          //   WebkitTextFillColor: "transparent",
          // }}
          >
            actually
          </span>{" "}
          contribute to.
        </Heading>
        <Text maxW="600px" m="20px auto" fontSize="20px" textAlign={"center"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          dolorem inventore alias assumenda quisquam qui repellat eaque illo
          architecto dolor iur
        </Text>
        <Center>
          <Button
            mt={5}
            leftIcon={<FaGithub />}
            bgGradient={gradient}
            variant="solid"
            size="lg"
          >
            Sign In With GitHub
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};

export default Hero;
