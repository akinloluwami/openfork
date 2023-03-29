import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Tag,
  Text,
  Spinner,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaUser, FaShare } from "react-icons/fa";
import { TbArrowBigUpLines } from "react-icons/tb";
import { supabase } from "../utils/supabaseClient";
import path from "path";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";

interface upvoteProps {
  id: number;
  user_id?: string;
  project_id: number;
  created_at: Date;
}

interface ProjectProps {
  id: number;
  name: string;
  tagline: string;
  github_url: string;
  tech_stack: string[];
  description: string;
}

const ProjectInfo = ({
  id,
  name,
  tagline,
  github_url,
  tech_stack,
  description,
}: ProjectProps) => {
  const [upvotes, setUpvotes] = useState<upvoteProps[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>({});
  const [error, setError] = useState(false);
  const [repoData, setRepoData] = useState<any>({});
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState(0);

  const getUsername = async (id: any) => {
    let { data: projects }: { data: any } = await supabase
      .from("projects")
      .select("user")
      .eq("id", id);
    const user_id = projects[0].user;

    let { data: profiles }: { data: any } = await supabase
      .from("profiles")
      .select("username, is_verified")
      .eq("id", user_id);
    setUsername(profiles[0]?.username);
    setIsVerified(profiles[0]?.is_verified);
  };

  const getUpvotes = async () => {
    let { data: upvotes }: { data: any } = await supabase
      .from("project_upvotes")
      .select("*")
      .eq("project_id", id);
    setUpvotes(upvotes);
  };

  const getCurrentUser = async () => {
    setCurrentUser((await supabase.auth.getUser()).data.user?.id);
  };

  const getCommentLength = async () => {
    let { data: project_comments }: { data: any } = await supabase
      .from("project_comments")
      .select("id")
      .eq("project_id", id);
    setComments(project_comments?.length);
  };

  useEffect(() => {
    getUpvotes();
    getCurrentUser();
    getCommentLength();
  }, [currentUser, supabase]);

  function checkUpvoted() {
    return upvotes?.some(function (project: upvoteProps) {
      return project.user_id === currentUser;
    });
  }

  const toast = useToast();

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUser() {
      await supabase.auth.getUser().then((data) => {
        setUser(data.data.user?.user_metadata);
      });
    }
    getUser();
  }, []);

  const upvoteProject = async () => {
    if (!user) {
      toast({
        title: "Sign in to upvote",
        status: "warning",
        duration: 900,
        isClosable: true,
      });
      return;
    }
    const obj: upvoteProps = {
      created_at: new Date(),
      id: 100,
      project_id: id,
      user_id: currentUser,
    };
    if (checkUpvoted()) {
      await supabase
        .from("project_upvotes")
        .delete()
        .eq("user_id", currentUser)
        .eq("project_id", id);

      const newUpvotes = upvotes.filter(
        (upvote: upvoteProps) => upvote.user_id !== currentUser
      );
      setUpvotes(newUpvotes);
    } else {
      await supabase
        .from("project_upvotes")
        .insert([{ project_id: id, user_id: currentUser }]);
      setUpvotes([...upvotes, obj]);
    }
  };

  return (
    <Box>
      <Box p="0">
        <Heading mb="10px" fontSize={"5xl"}>
          {name}
        </Heading>
        <Link href={github_url} target="_blank" fontSize={"sm"}>
          <Flex gap={2} align="center" textDecoration="underline">
            <SiGithub />
            <Text>Visit Github Page</Text>
          </Flex>
        </Link>
        {/* <Link textDecoration="underline" href={`/${username}`}>
          <Flex gap={2} align="center" my="5px">
            {" "}
            <FaUser />
            <Text>
              {" "}
              @{username} {isVerified && <Icon as={GoVerified} ml={1} />}
            </Text>
          </Flex>
        </Link> */}

        <Text p="25px 0">{tagline}</Text>

        <Flex mb="20px" gap={3} flexWrap="wrap" width={"90%"}>
          {tech_stack?.map((stack: string, i: number) => (
            <Tag size={"lg"} key={i}>
              {stack}
            </Tag>
          ))}
        </Flex>

        <Text width={["90%", "lg"]}>{description && description}</Text>

        <Flex gap={4} py="10px">
          <Text>{upvotes.length || "0 "} Upvotes</Text>
          <Text>{comments} Comments</Text>
        </Flex>

        <Flex gap={5}>
          <Button
            size={"lg"}
            gap={3}
            onClick={() => {
              upvoteProject();
            }}
            bg={
              checkUpvoted()
                ? ""
                : "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
            }
            border={"2px"}
            borderColor={checkUpvoted() ? "#d53f8c" : "transparent"}
          >
            <TbArrowBigUpLines />
            <Text>
              {" "}
              {checkUpvoted() ? "Upvoted" : "Upvote"} {upvotes.length}
            </Text>
          </Button>
          <Button size={"lg"} gap={3}>
            <FaShare />
            <Text>Share</Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProjectInfo;
