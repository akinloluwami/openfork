import { Box, Button, Flex, Link, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { TbArrowBigUpLines } from "react-icons/tb";
import { supabase } from "../utils/supabaseClient";

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
}

const ProjectInfo = ({ id, name, tagline, github_url, tech_stack }: any) => {
  const [upvotes, setUpvotes] = useState<upvoteProps[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();

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

  useEffect(() => {
    getUpvotes();
    getCurrentUser();
  }, [currentUser, supabase]);

  function checkUpvoted() {
    return upvotes.some(function (project: upvoteProps) {
      return project.user_id === currentUser;
    });
  }

  const upvoteProject = async () => {
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
    <Box w={"60%"} my={2} mx={"auto"}>
      <Flex justify={"space-between"} align={"center"}>
        <Box>
          <Text fontSize={"2rem"} fontWeight={600}>
            {name}
          </Text>
          <Text mb={3} mt={1} fontSize={"1.5rem"} fontWeight={"thin"}>
            {tagline}
          </Text>
        </Box>
        <Flex align={"center"} gap={3}>
          <Link href={github_url} target="_blank" fontSize={"3xl"}>
            <SiGithub />
          </Link>
          {currentUser && (
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
          )}
        </Flex>
      </Flex>
      <Box my={5}>
        {tech_stack.map((stack: string, i: number) => (
          <Tag mr={2} size={"lg"} key={i}>
            {stack}
          </Tag>
        ))}
      </Box>
      <Flex align={"center"}>
        <Flex align={"center"} fontSize={"xl"} gap={1}></Flex>
      </Flex>
    </Box>
  );
};

export default ProjectInfo;
