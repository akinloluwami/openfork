import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

const ProjectCommentInput = ({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) => {
  const inputRef = useRef();

  const [commentText, setCommentText] = useState("");

  const sendComment = async () => {
    const { data, error } = await supabase
      .from("project_comments")
      .insert([
        { project_id: postId, user_id: userId, comment_text: commentText },
      ]);
    setCommentText("");
  };
  return (
    <Box
      borderWidth={"2px"}
      px={"10px"}
      borderLeft={"none"}
      borderRight={"none"}
    >
      <Textarea
        value={commentText}
        placeholder="What do you think?"
        onChange={(e) => setCommentText(e.target.value)}
        border={"none"}
        resize={"none"}
        focusBorderColor={"none"}
      />
      <Button onClick={sendComment} my={2} disabled={!commentText}>
        Comment
      </Button>
    </Box>
  );
};

export default ProjectCommentInput;
