import React from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { profile } from "console";
import Head from "next/head";
import Header from "../../components/Header";
import ContainerLayout from "../../layouts/ContainerLayout";
import { Box, Flex, Text, Link, Button, Tag } from "@chakra-ui/react";
// import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { TbArrowBigUpLines } from "react-icons/tb";
import StackTag from "../../components/Tag";
import { IoIosShareAlt } from "react-icons/io";
import { RiShareForwardFill } from "react-icons/ri";
import { gradient } from "../../styles/gradient";
import ProjectComments from "../../components/ProjectComments";
import ProjectInfo from "../../components/ProjectInfo";
import {
  ProjectInfoProgress,
  ProjectAsideProgress,
} from "../../components/Progress";

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
export async function getServerSideProps(context: any) {
  let { data: user }: { data: any } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", context.params.profile);
  const userId = user[0]?.id;
  let { data: project }: { data: any } = await supabase
    .from("projects")
    .select("*")
    .eq("user", userId)
    .eq("slug", context.params.project);
  return {
    props: {
      data: project[0] || null,
    },
  };
}
const Project = ({ data }: { data: ProjectProps }) => {
  const { id, name, tagline, github_url, tech_stack } = data || {};

  const [upvotes, setUpvotes] = useState<upvoteProps[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const getUpvotes = async () => {
    let { data: upvotes }: { data: any } = await supabase
      .from("project_upvotes")
      .select("*")
      .eq("project_id", id);
    setUpvotes(upvotes);
  };

  const getCurrentUser = async () => {
    setCurrentUser((await supabase.auth.getUser()).data.user?.id);
    setLoading(false);
  };

  useEffect(() => {
    getUpvotes();
    getCurrentUser();
  }, [currentUser, supabase]);

  return (
    <>
      {data === null ? (
        <>NULL</>
      ) : (
        <div>
          <Head>
            <title>
              <>
                {" "}
                {name} - {tagline}{" "}
              </>
            </title>
          </Head>
          <Header />
          <Box>
            <Flex
              justify="space-between"
              // direction="column"
              className="project-info-wrapper"
            >
              {loading && (
                <>
                  <Box flex={1} p={8}>
                    <ProjectInfoProgress />
                  </Box>
                  <ProjectAsideProgress />
                </>
              )}
            </Flex>

            {!loading && (
              <Flex
                justify="space-between"
                // direction="column"
                p={8}
                className="project-info-wrapper"
              >
                <Box flex={1}>
                  <ProjectInfo
                    tech_stack={tech_stack}
                    id={id}
                    name={name}
                    tagline={tagline}
                    github_url={github_url}
                  />
                </Box>
                <ProjectAsideProgress />
              </Flex>
            )}

            {/* {!loading && } */}
          </Box>

          <ProjectComments userId={currentUser} postId={id} />
        </div>
      )}
    </>
  );
};

export default Project;
