import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Button, Center } from "@chakra-ui/react";
// import ProjectCard from "./ProjectCard";
import { FaGithub } from "react-icons/fa";
import { gradient } from "../styles/gradient";
import ContainerLayout from "../Layout/ContainerLayout";
const Hero: NextPage = () => {
  return (
    <ContainerLayout>
      <Flex
        alignItems={"center"}
        // justifyContent={"flex-start"}
        // minH={"70vh"}
        direction={"column"}
        pt={"6rem"}
      >
        <Box>
          <Heading
            fontSize={["4xl", "55px"]}
            maxW="600px"
            m="auto"
            textAlign={"center"}
            fontFamily={"var(--satoshi)"}
          >
            Open-source projects you can{" "}
            <span
              style={
                {
                  // backgroundClip: "text",
                  // WebkitBackgroundClip: "text",
                  // background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
                  // WebkitTextFillColor: "transparent",
                }
              }
            >
              actually
            </span>{" "}
            contribute to.
          </Heading>

          <Text
            maxW="600px"
            m="20px auto"
            fontSize={["md", "16px"]}
            textAlign={"center"}
            fontFamily={"var(--satoshi)"}
          >
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
              fontSize="13px"
            >
              Sign In With GitHub
            </Button>
          </Center>
        </Box>
      </Flex>
    </ContainerLayout>
  );
};

export default Hero;
