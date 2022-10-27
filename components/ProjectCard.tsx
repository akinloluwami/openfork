import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Avatar, Icon } from "@chakra-ui/react";
import StackTag from "./Tag";
import {
  SiChakraui,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { GoVerified } from "react-icons/go";

interface Props {
  name: string;
  owner?: string;
  description: string;
  imgSrc?: any;
  onOpen?: any;
}

const ProjectCard = ({ name, owner, description, imgSrc, onOpen }: Props) => {
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const truncate = (str: string) => {
    const maxLength = 35;
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  };

  const getUsername = async (id: string) => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("username, is_verified")
      .eq("id", id);
    profiles && setUsername(profiles[0]?.username);
    profiles && setIsVerified(profiles[0]?.is_verified);
  };
  useEffect(() => {
    owner && getUsername(owner);
  }, []);
  return (
    <Link href={`?projects/${name}`} as={`/projects/${name?.toLowerCase()}`}>
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
            <Heading as="h3" fontSize="30px">
              <Text fontSize={"0.7em"}>{name}</Text>

              <Flex align={"center"}>
                <Text fontSize="14px" fontWeight="thin" py={2}>
                  {username}
                </Text>
                <Text fontSize="14px" fontWeight="thin" py={2}>
                  {isVerified && <Icon as={GoVerified} ml={1} />}
                </Text>
              </Flex>
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
