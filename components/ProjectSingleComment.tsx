import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { GoVerified } from "react-icons/go";
import { TbArrowBigUpLines } from "react-icons/tb";
import { supabase } from "../utils/supabaseClient";
import ProjectCommentInput from "./ProjectCommentInput";
import Link from "next/link";

interface UserProps {
  avatar_url: string;
  display_name: string;
  username: string;
  is_verified: boolean;
}

interface UpvoteProps {
  id: number;
  user_id: string;
  comment_id: string;
  created_at: Date;
}

const ProjectSingleComment = ({ comment }: any) => {
  const [user, setUser] = useState<UserProps>({
    avatar_url: "",
    display_name: "",
    username: "",
    is_verified: false,
  });

  const [upvotes, setUpvotes] = useState<UpvoteProps[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();

  const fetchUser = async () => {
    let { data: profiles, error }: any = await supabase
      .from("profiles")
      .select("username, is_verified, avatar_url, display_name")
      .eq("id", comment.user_id);
    setUser(profiles[0]);
  };

  const getCurrentUser = async () => {
    setCurrentUser((await supabase.auth.getUser()).data.user?.id);
  };

  const getUpvotes = async () => {
    let { data: comment_upvotes }: { data: any } = await supabase
      .from("comment_upvotes")
      .select("*")
      .eq("comment_id", comment.id);
    setUpvotes(comment_upvotes);
  };

  useEffect(() => {
    getUpvotes();
    getCurrentUser();
    fetchUser();
  }, []);

  function checkUpvoted() {
    return upvotes?.some(function (upvote: UpvoteProps) {
      return upvote.user_id === currentUser;
    });
  }

  const upvoteComment = async () => {
    const obj = {
      created_at: new Date(),
      id: Math.floor(Math.random() * 10) + 1000000000,
      comment_id: comment.id,
      user_id: currentUser,
    };
    if (checkUpvoted()) {
      await supabase
        .from("comment_upvotes")
        .delete()
        .eq("user_id", currentUser)
        .eq("comment_id", comment.id);

      const newUpvotes = upvotes.filter(
        (upvote: UpvoteProps) => upvote.user_id !== currentUser
      );
      setUpvotes(newUpvotes);
    } else {
      await supabase
        .from("comment_upvotes")
        .insert([{ comment_id: comment.id, user_id: currentUser }]);
      setUpvotes([...upvotes, obj]);
    }
  };

  return (
    <Box mb={10}>
      <Flex mb={2} align={"center"}>
        <Avatar
          src={user.avatar_url}
          size={"md"}
          mr={2}
          name={user.display_name}
        />
        <Box>
          <Text fontWeight={"bold"} mr={1}>
            {user.display_name}
          </Text>
          <Flex>
            <Link href={"/" + user.username}>
              <>@{user.username}</>
            </Link>
            {user.is_verified && <Icon fontSize="sm" as={GoVerified} ml={1} />}
          </Flex>
        </Box>
      </Flex>
      <Text p={4} my={2} bg="gray.900" borderRadius="md">
        {comment.comment_text}
      </Text>
      <Flex gap={7} my={3} align="center" fontSize={"xs"}>
        <Flex
          gap={2}
          cursor={"pointer"}
          fontSize="md"
          align="center"
          color={checkUpvoted() ? "#d53f8c" : ""}
          onClick={() => currentUser && upvoteComment()}
        >
          <TbArrowBigUpLines /> ({upvotes && upvotes.length})
        </Flex>
        {/* <Text>Reply</Text> */}
        <Text>
          {new Date(comment.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            // dayPeriod: "ordinal",
          })}
        </Text>
      </Flex>
      <Box ml={10}></Box>
    </Box>
  );
};

export default ProjectSingleComment;
