import { Box, Button, Flex, Input,Avatar, Spinner } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import {FaPaperPlane} from "react-icons/fa"

const ProjectCommentInput = ({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) => {
  const inputRef = useRef();

  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  const sendComment = async () => {
    setSending(true)
    const { data, error } = await supabase
      .from("project_comments")
      .insert([
        { project_id: postId, user_id: userId, comment_text: commentText },
      ]);
    setCommentText("");
    setSending(false)

  };
  return (
    <Box>
    <Flex bg="gray.900" p={2} px={4} gap={2} align="center" my={3} borderRadius="full">
      <Avatar size="md" />
    <Input value={commentText} focusBorderColor={"none"} onChange={(e) => setCommentText(e.target.value)} placeholder="What do you think?" bg="none" outline="none" border="none" />
     <Button size={"lg"} bg={"linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"} onClick={sendComment} my={2} disabled={!commentText || sending}>
    {sending ? <Spinner />: <FaPaperPlane />}
      </Button>
    </Flex>
    </Box>
  );
};

export default ProjectCommentInput;
