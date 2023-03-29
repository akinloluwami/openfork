import { Box, Text, Button, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Projects from "../pages/[profile]/projects";
import { supabase } from "../utils/supabaseClient";
import { CommentProgress } from "./Progress";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const fetchComments = async () => {
    let { data: project_comments, error }: any = await supabase
      .from("project_comments")
      .select("*")
      .eq("project_id", postId);
    setComments(project_comments);
    setIsLoading(false);
    error && setisError(true);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <Box mt={10} px={8}>
      {!isLoading && !isError && (
        <ProjectCommentInput userId={userId} postId={postId} />
      )}

      <Box mt={5}>
        {isLoading && <CommentProgress />}

        {!isLoading &&
          comments &&
          comments.map((comment: any) => (
            <ProjectSingleComment comment={comment} key={comment.id} />
          ))}

        {!comments && !isLoading && (
          <Center textAlign="center">
            <Box>
              <Text my="2" fontWeight="bold">
                An Error Occurred.
              </Text>
              <Button>Retry</Button>
            </Box>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default ProjectComments;
