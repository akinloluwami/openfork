import {
  Box,
  Button,
  Center,
  Circle,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Input,
  ListItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagCloseButton,
  TagLeftIcon,
  Text,
  UnorderedList,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { FaCheck, FaGithub, FaLightbulb, FaCodeBranch } from "react-icons/fa";
import { SiGithub, SiChainlink } from "react-icons/si";
import Header from "../../components/Header";
import userInfo from "../../utils/userInfo";
import ts from "../../utils/techstack";
import { octokit } from "../../utils/octokitClient";
import { supabase } from "../../utils/supabaseClient";
import Head from "next/head";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Router from "next/router";
import GradientButton from "../../components/GradientButton";
interface RepoData {
  name: string;
  svn_url: string;
  full_name: string;
}

interface TagData {
  name: string;
  logo: any;
}

const Check = ({ done = false }) => {
  return (
    <Flex
      w="50px"
      h="50px"
      borderRadius="50px"
      align="center"
      justify="center"
      bg={done ? "gray.400" : "green.500"}
    >
      <FaCheck />
    </Flex>
  );
};

const AddNewProject = () => {
  const regex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const testUrl = (url: string) => {
    return regex.test(url);
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const [projectName, setProjectName] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [repoFullname, setRepoFullname] = useState("");
  const [validurl, setValidURL] = useState(false);
  const [stackQuery, setStackQuery] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const stackQueryRef: any = useRef();
  const { width, height } = useWindowSize();
  const toast = useToast();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    async function getRepos() {
      const user = (await supabase.auth.getUser()).data.user;
      setUsername(user?.user_metadata?.user_name);
      octokit
        .request("GET /users/{username}/repos", {
          username: user?.user_metadata?.user_name,
          per_page: 100,
        })
        .then((data: any) => {
          setRepos(data.data);
        });
    }
    getRepos();
  }, []);

  const publishProject = async () => {
    setPublishing(true);
    const project = {
      user: (await supabase.auth.getUser()).data.user?.id,
      name: projectName,
      tagline,
      description,
      github_url: githubURL,
      website_url: websiteURL,
      tech_stack: techStack,
      slug: projectName.toLowerCase().replaceAll(" ", "-"),
    };

    const { data, error } = await supabase.from("projects").insert(project);
    setPublishing(false);
    if (error) {
      console.log(error);
    } else {
      toast({
        title: "Your project has been publish",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        Router.push("/");
      }, 2500);
      handleTabsChange(0);
      setTagline("");
      setGithubURL("");
      setProjectName("");
      setSelectedTags([]);
      setWebsiteURL("");
    }
  };

  return (
    <>
      <Head>
        <title>Publish a new project - Openfork</title>
      </Head>
      <Header />

      {showConfetti && <Confetti width={width} height={height} />}
      <Box p="20px 5%" className="new-project">
        <Box>
          <Heading fontWeight="bold">Publish a new Project</Heading>
          <Text fontSize="15px">
            Please follow the steps to create and publish your project
          </Text>
        </Box>

        <Flex my="3%" gap="15px" className="wrapper" justify="space-between">
          <Box w="350px">
            {/* project name  */}
            <Flex
              gap={4}
              p="20px"
              rounded="lg"
              w="full"
              justify="center"
              bg="gray.900"
              my="20px"
              align="center"
            >
              <SiGithub />
              <Text>{projectName}</Text>
            </Flex>

            {/* // lists */}
            <Box my="20px" className="progress" fontSize="15px">
              <Flex gap={2} align="inherit">
                <Flex gap="0" m="0" direction="column" align={"center"}>
                  <Circle
                    bg={`${githubURL ? "green.500" : "gray.900"}`}
                    m="0"
                    p="10px"
                  />
                  <Box
                    w="7px"
                    flexShrink={"0"}
                    h="35px"
                    bg={`${githubURL ? "green.500" : "gray.900"}`}
                  ></Box>
                </Flex>
                <Text>Select Repository</Text>
              </Flex>
              <Flex gap={2} align="inherit">
                <Flex gap="0" m="0" direction="column" align={"center"}>
                  <Circle
                    bg={`${
                      githubURL && projectName && tagline && description
                        ? "green.500"
                        : "gray.900"
                    }`}
                    m="0"
                    p="10px"
                  />
                  <Box
                    w="7px"
                    flexShrink={"0"}
                    h="35px"
                    bg={`${
                      githubURL && projectName && tagline && description
                        ? "green.500"
                        : "gray.900"
                    }`}
                  ></Box>
                </Flex>
                <Text>Project Info</Text>
              </Flex>
              <Flex gap={2} align="inherit">
                <Flex gap="0" m="0" direction="column" align={"center"}>
                  <Circle
                    bg={`${
                      githubURL &&
                      projectName &&
                      tagline &&
                      description &&
                      selectedTags.length > 0
                        ? "green.500"
                        : "gray.900"
                    }`}
                    m="0"
                    p="10px"
                  />
                  <Box
                    w="7px"
                    flexShrink={"0"}
                    h="35px"
                    bg={`${
                      githubURL &&
                      projectName &&
                      tagline &&
                      description &&
                      selectedTags.length > 0
                        ? "green.500"
                        : "gray.900"
                    }`}
                  ></Box>
                </Flex>
                <Text>Tech Stack</Text>
              </Flex>
              <Flex gap={2} align="inherit">
                <Flex gap="0" m="0" direction="column" align={"center"}>
                  <Circle
                    bg={`${
                      githubURL &&
                      projectName &&
                      tagline &&
                      description &&
                      selectedTags.length > 0
                        ? "green.500"
                        : "gray.900"
                    }`}
                    m="0"
                    p="10px"
                  />
                  <Box
                    w="7px"
                    opacity={0}
                    flexShrink={"0"}
                    h="35px"
                    bg={`${
                      githubURL &&
                      projectName &&
                      tagline &&
                      description &&
                      selectedTags.length > 0
                        ? "green.500"
                        : "gray.900"
                    }`}
                  ></Box>
                </Flex>
                <Text>Publish Project</Text>
              </Flex>
              {/* <Flex gap={2} align="center">
      <VStack>
      <Box p="6px 2px" bg="gray.900" m="0"></Box>
      <Circle bg="gray.900" p="10px" />
      </VStack>
      <Text>Project Info</Text>
    </Flex>
   <Flex gap={2} align="center">
      <VStack>
      <Box p="6px 2px" bg="gray.900" m="0"></Box>
      <Circle bg="gray.900" p="10px" />
      </VStack>
      <Text>Tech Stack</Text>
    </Flex>
   <Flex gap={2} align="center">
      <VStack>
      <Box p="6px 2px" bg="gray.900" m="0"></Box>
      <Circle bg="gray.900" p="10px" />
      </VStack>
      <Text>Publish Project</Text>
    </Flex> */}
            </Box>

            {/* about */}
            <Box>
              <Text fontWeight="bold" my="25px">
                Project Details
              </Text>
              <Flex gap={3} my={4} align="center">
                <Icon as={SiGithub} />
                <Text fontSize="14px" fontWeight="bold" color="blue.600">
                  {githubURL}
                </Text>
              </Flex>

              <Flex gap={3} align="center">
                <Icon as={SiChainlink} />
                <Text fontSize="14px" fontWeight="bold" color="blue.600">
                  {websiteURL}
                </Text>
              </Flex>
              <Box></Box>
            </Box>
          </Box>

          <Box w="full">
            <Box bg="gray.900" rounded="25px" m="30px auto" w="full" p="1%">
              <Box m="10px 20px">
                <Heading fontSize="28px">Repository</Heading>
              </Box>
              <Box m="0 20px">
                {githubURL === "" && (
                  <Input
                    placeholder={"Search repository"}
                    my={2}
                    h="60px"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                )}

                {githubURL !== "" && (
                  <Button
                    bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
                    fontSize="13px"
                    p={0.5}
                    my={3}
                    maxW={350}
                    h="60px"
                  >
                    <Flex
                      overflow="hidden"
                      align={"center"}
                      bg={"#000"}
                      my={3}
                      w={"100%"}
                      h={"100%"}
                      p={"10px"}
                      cursor={"pointer"}
                      borderRadius={"5px"}
                    >
                      <Icon as={SiGithub} h={5} w={5} mr={2} />
                      <Text>{repoFullname}</Text>
                    </Flex>
                    <CloseButton
                      onClick={() => {
                        setGithubURL("");
                        setProjectName("");
                        setTagline("");
                        setValidURL(false);
                      }}
                    />
                  </Button>
                )}

                <Flex direction="column" gap="15px">
                  {!query ? (
                    <></>
                  ) : githubURL !== "" ? (
                    <></>
                  ) : (
                    repos
                      .filter((r: RepoData) =>
                        r.name.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((repo: RepoData, i) => (
                        <Button
                          bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
                          fontSize="13px"
                          p={0.5}
                          m={3}
                          w="80vw"
                          position="relative"
                          maxW={"350px"}
                          key={i}
                        >
                          <Flex
                            align={"center"}
                            overflow="hidden"
                            bg={"#000"}
                            my={3}
                            w={"100%"}
                            h={"100%"}
                            p={0.5}
                            cursor={"pointer"}
                            borderRadius={"5px"}
                            onClick={() => {
                              setGithubURL(repo.svn_url);
                              setProjectName(repo.name);
                              setQuery("");
                              setRepoFullname(repo.full_name);
                            }}
                          >
                            <Icon as={SiGithub} h={5} w={5} mr={2} />
                            <Text color={"grey.100"}>{username}/</Text>
                            <Text>{repo.name}</Text>
                          </Flex>
                        </Button>
                      ))
                  )}
                </Flex>

                {/* <Button bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)" mt="15px" mb="25px" h="60px" w="full">Continue
    </Button> */}
              </Box>
            </Box>

            <Box bg="gray.900" rounded="25px" m="30px auto" w="full" p="1%">
              <Box m="10px 20px" maxW="500px">
                <Heading fontSize="28px">Project Info</Heading>
              </Box>
              {githubURL && (
                <Box m="0 20px">
                  <Box>
                    <Text>Project name</Text>
                    <Input
                      placeholder={"Simply the name of the project"}
                      p="14px"
                      h="60px"
                      w="100%"
                      my={2}
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Text>Tagline</Text>
                    <Input
                      placeholder={
                        "Concise and descriptive tagline of the project"
                      }
                      p="14px"
                      h="60px"
                      my={2}
                      onChange={(e) => setTagline(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <Text>Website link</Text>
                    <Input
                      placeholder={"Link to the project website"}
                      p="14px"
                      h="60px"
                      my={2}
                      onChange={(e) => {
                        setWebsiteURL(e.target.value);
                        setValidURL(testUrl(e.target.value));
                      }}
                    />
                  </Box>
                  <Box>
                    <Text>Description</Text>
                    <Input
                      placeholder={"A short description of the project"}
                      p="14px"
                      h="60px"
                      my={2}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Box>

                  {/* <Button bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)" mt="15px" mb="25px" h="60px" w="full">Continue
    </Button> */}
                </Box>
              )}
            </Box>

            <Box bg="gray.900" rounded="25px" m="30px auto" w="full" p="1%">
              <Box m="10px 20px" maxW="500px">
                <Heading fontSize="28px">Tech Stack</Heading>
              </Box>

              <Flex direction={"column"} p="0 20px">
                {githubURL && tagline && projectName && description && (
                  <Box>
                    <Flex my={2} gap={2}>
                      {selectedTags.map((tag, i) => (
                        <Tag key={i}>
                          <TagLeftIcon>{tag.logo}</TagLeftIcon>
                          {tag.name}
                          <TagCloseButton
                            onClick={() => {
                              setSelectedTags(
                                selectedTags.filter((t) => t !== tag)
                              );
                            }}
                          />
                        </Tag>
                      ))}
                    </Flex>
                    <Input
                      placeholder={"Search"}
                      h="60px"
                      my={4}
                      ref={stackQueryRef}
                      onChange={(e) => {
                        let timer;
                        if (timer) {
                          clearInterval(timer);
                        }
                        timer = setTimeout(() => {
                          setStackQuery(e.target.value);
                        }, 300);
                      }}
                    />
                    <Flex direction={"column"}>
                      {stackQuery !== "" &&
                        ts
                          .filter(
                            (t) =>
                              t.name
                                .toLowerCase()
                                .includes(stackQuery.toLowerCase()) &&
                              !selectedTags.includes(t)
                          )
                          .map((tag, i) => (
                            <Tag
                              key={i}
                              my={2}
                              onClick={() => {
                                setSelectedTags([...selectedTags, tag]);
                                setTechStack([...techStack, tag.name]);
                                setStackQuery("");
                                stackQueryRef.current.value = "";
                              }}
                            >
                              <Text>{tag.name}</Text>
                            </Tag>
                          ))}
                    </Flex>
                  </Box>
                )}
                {selectedTags.length > 0 && (
                  <Button
                    my="20px"
                    h="60px"
                    disabled={selectedTags.length < 1}
                    onClick={publishProject}
                  >
                    {publishing ? <Spinner size={"lg"} /> : "Publish Project"}
                  </Button>
                )}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AddNewProject;
