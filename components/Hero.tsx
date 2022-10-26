import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Button, Center } from "@chakra-ui/react";
// import ProjectCard from "./ProjectCard";
import { FaGithub } from "react-icons/fa";
import { gradient } from "../styles/gradient";
import ContainerLayout from "../Layout/ContainerLayout";
import { useContext, useEffect, useState } from "react";
import { signInWithGithub } from "../utils/supabase/auth";
import userInfo from "../utils/userInfo";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
const Hero: NextPage = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUser() {
      await supabase.auth.getUser().then((data) => {
        setUser(data.data.user?.user_metadata);
      });
    }
    getUser();
  }, []);
  return (
    <ContainerLayout>
      <Flex
        alignItems={"center"}
        // justifyContent={"flex-start"}
        minH={"80vh"}
        direction={"column"}
        pt={"3em"}
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
            We understand that other open-source project directories contain a
            lot of projects you may not really be excited about contributing to.
            So we created Openfork, bringing you a lot of exciting projects you
            can actually contribute to and have a direct impact on.
          </Text>
          {!user ? (
            <Center>
              <Button
                mt={5}
                leftIcon={<FaGithub />}
                bgGradient={gradient}
                variant="solid"
                size="lg"
                onClick={signInWithGithub}
              >
                Sign In With GitHub
              </Button>
            </Center>
          ) : (
            <Center>
              <Link href={"/projects/new"}>
                <Button
                  mt={5}
                  leftIcon={<FaGithub />}
                  bgGradient={gradient}
                  variant="solid"
                  size="lg"
                >
                  Publish new project
                </Button>
              </Link>
            </Center>
          )}
        </Box>
      </Flex>
    </ContainerLayout>
  );
};

export default Hero;
