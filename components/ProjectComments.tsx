import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Projects from "../pages/[profile]/projects";
import { supabase } from "../utils/supabaseClient";
import ProjectCommentInput from "./ProjectCommentInput";
import ProjectSingleComment from "./ProjectSingleComment";

const ProjectComments = ({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) => {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    let { data: project_comments, error }: any = await supabase
      .from("project_comments")
      .select("*")
      .eq("project_id", postId);
    setComments(project_comments);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <Box w={"50%"} mx={"auto"} mt={10}>
      <ProjectCommentInput userId={userId} postId={postId} />

      <Box mt={5}>
        {/* {comments.map((comment: any) => {
          return <Text>Hiii</Text>;
        })} */}

        {comments.map((comment: any) => (
          <ProjectSingleComment comment={comment} key={comment.id} />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectComments;
