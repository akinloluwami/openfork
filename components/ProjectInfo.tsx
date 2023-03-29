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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaUser, FaShare } from "react-icons/fa";
import { TbArrowBigUpLines } from "react-icons/tb";
import { supabase } from "../utils/supabaseClient";
import path from "path";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
// import githubContent from "../utils/githubContent";

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

const ProjectInfo = ({
  id,
  name,
  tagline,
  github_url,
  tech_stack,
}: ProjectProps) => {
  const [upvotes, setUpvotes] = useState<upvoteProps[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [isVerified, setIsVerified] = useState(false);

  // GITHUB CONTENT TEMP LOCATION
  const [loading, setLoading] = useState(true);
  const [screenshots, setScreenshot] = useState([]);
  const [config, setConfig] = useState<any>({});
  const [error, setError] = useState(false);
  const [repoData, setRepoData] = useState<any>({});
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState(0);

  const githubContent = (githubUrl: string, filename: string) => {
    const split = githubUrl.split("/"); // https://github.com/user/repo
    const username = split[3];
    const repo = split[4];
    const api = `https://api.github.com/repos/${username}/${repo}`;

    const fetchData = async () => {
      const apiFetch = await fetch(api);
      setLoading(false);
      if (apiFetch.ok) {
        const repoData = await apiFetch.json();
        setRepoData(repoData);
        const url = `https://raw.githubusercontent.com/${username}/${repo}/${repoData.default_branch}/${filename}`;
        const response = await fetch(url);
        if (response.ok) {
          const configFile = JSON.parse(`${await response.text()}`);
          setConfig(configFile);
          return;
        }
        setError(true);
        return;
      }
      setError(true);
    };

    fetchData();
    // console.log(repoData)
    // console.log(config, error)
    if (config.screenshots && !error) {
      const images = config.screenshots.map((shot: string) => {
        return path.join(
          `https://raw.githubusercontent.com/${username}/${repo}/${repoData.default_branch}/`,
          shot
        );
      });
      setScreenshot(images);
    }
  };

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

  useEffect(() => {
    githubContent(github_url, ".openfork");
    // console.log(screenshots);
    getUsername(id);
  }, [config, id]);

  //GITHUB CONTENT END

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
    <>
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
        <Link textDecoration="underline" href={`/${username}`}>
          <Flex gap={2} align="center" my="5px">
            {" "}
            <FaUser />
            <Text>
              {" "}
              @{username} {isVerified && <Icon as={GoVerified} ml={1} />}
            </Text>
          </Flex>
        </Link>

        <Text p="25px 0">{tagline}</Text>

        <Flex pb="10px" gap={3}>
          {tech_stack?.map((stack: string, i: number) => (
            <Tag size={"lg"} key={i}>
              {stack}
            </Tag>
          ))}
        </Flex>

        <Flex m="12px 0">
          {loading && <Spinner />}
          {!loading && !error && screenshots && (
            <Box>
              <Image
                src={screenshots[0]}
                objectFit="cover"
                bg={"grey.900"}
                w="full"
                h="350px"
                alt="screenshot"
              />
            </Box>
          )}
        </Flex>

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

      {/* <Box w={"60%"} my={2} mx={"auto"}>
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
        {tech_stack?.map((stack: string, i: number) => (
          <Tag mr={2} size={"lg"} key={i}>
            {stack}
          </Tag>
        ))}
      </Box>
      <Flex align={"center"}>
        <Flex align={"center"} fontSize={"xl"} gap={1}></Flex>
      </Flex>
    </Box> */}
    </>
  );
};

export default ProjectInfo;
