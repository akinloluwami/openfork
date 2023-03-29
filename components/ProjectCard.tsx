import type { NextPage } from "next";
import {
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Icon,
  Button,
  Spinner,
} from "@chakra-ui/react";
import StackTag from "./Tag";
import {
  SiChakraui,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
import { TbArrowBigUpLines } from "react-icons/tb";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { GoVerified } from "react-icons/go";

interface Props {
  id?: number;
  name: string;
  owner?: string;
  tagline: string;
  imgSrc?: any;
  onOpen?: any;
  upvotes?: any;
  upvoteProject?: any;
  github?: string;
  techStack?: any;
  isUpvoting?: number;
  slug: string;
}
interface upvoteProps {
  user_id: string;
}

const ProjectCard = ({
  id,
  name,
  owner,
  tagline,
  imgSrc,
  onOpen,
  upvoteProject,
  upvotes,
  github,
  techStack,
  isUpvoting,
  slug,
}: Props) => {
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [currentUser, setCurrentUser]: any = useState({});
  const [projectUpvotes, setProjectUpvotes] = useState([...upvotes]);
  const truncate = (str: string) => {
    const maxLength = 40;
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  };
  const [showTruncated, setShowTruncated] = useState(true);
  const getUsername = async (id: string) => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("username, is_verified")
      .eq("id", id);
    profiles && setUsername(profiles[0]?.username);
    profiles && setIsVerified(profiles[0]?.is_verified);
  };

  const getCurrentUser = async () => {
    const user: any = (await supabase.auth.getUser()).data.user;
    setCurrentUser(user);
  };

  useEffect(() => {
    owner && getUsername(owner);
    getCurrentUser();
  }, []);

  function checkUpvoted(user_id: string) {
    return projectUpvotes.some(function (project) {
      return project.user_id === user_id;
    });
  }

  const clientUpvote = () => {
    const obj = {
      created_at: new Date(),
      id: 100,
      project_id: id,
      user_id: currentUser.id,
    };

    if (checkUpvoted(currentUser.id)) {
      const newUpvotes = projectUpvotes.filter(
        (upvote: upvoteProps) => upvote.user_id !== currentUser.id
      );
      setProjectUpvotes(newUpvotes);
    } else {
      setProjectUpvotes([...projectUpvotes, obj]);
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      p={1}
      // maxW={["90vw", "400px"]}
      bg={"transparent"}
      cursor="pointer"
      borderRadius={"md"}
      _hover={{
        background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
      }}
    >
      <Box w={"100%"} p={6} bg="#111" borderRadius={"md"}>
        <Box>
          <Link href={`?${username}/${name}`} as={`/${username}/${slug}`}>
            <Box onClick={onOpen}>
              <Flex align="center" gap="10px">
                <Heading as="h3" fontSize="30px">
                  <Flex
                    justifyContent={"space-between"}
                    align="center"
                    w={"320px"}
                  >
                    {/* <Link href={github} target={"_blank"}> */}
                    <Text fontSize={"0.7em"}>{name}</Text>
                    {/* </Link> */}
                  </Flex>
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
              <Text
                m="15px 0"
                fontSize="15px"
                onClick={() => setShowTruncated(!showTruncated)}
              >
                {" "}
                {showTruncated ? truncate(tagline) : tagline}
              </Text>
              {/*  */}
              <Flex gap="10px" m="10px 0" align="center" wrap="wrap">
                {/*<StackTag stackName={"TypeScript"} icon={SiTypescript} />*/}
                {techStack.map((stack: string, i: number) => (
                  <StackTag stackName={stack} key={i} />
                ))}
              </Flex>
            </Box>
          </Link>
        </Box>

        {currentUser && (
          <Button
            as={Button}
            mt="5px"
            onClick={() => {
              upvoteProject(id, upvotes);
              clientUpvote();
            }}
            background={
              projectUpvotes.find(
                (upvote: upvoteProps) => upvote.user_id === currentUser.id
              )
                ? "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
                : ""
            }
          >
            <Flex align={"center"}>
              <Text fontSize={"xl"}>
                <TbArrowBigUpLines />
              </Text>
              <Text ml={1}>{projectUpvotes.length || 0}</Text>
            </Flex>
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default ProjectCard;
