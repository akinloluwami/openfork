import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Icon,
  Input,
  ListItem,
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
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { SiGithub } from "react-icons/si";
import Header from "../../components/Header";
import userInfo from "../../utils/userInfo";
import ts from "../../utils/techstack";
import { octokit } from "../../utils/octokitClient";
import { supabase } from "../../utils/supabaseClient";

interface RepoData {
  name: string;
  svn_url: string;
  full_name: string;
}

interface TagData {
  name: string;
  logo: any;
}

const AddNewProject = () => {
  const regex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const testUrl = (url: string) => {
    return regex.test(url);
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");
  const [projectName, setProjectName] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [description, setDescription] = useState("");
  const [repoFullname, setRepoFullname] = useState("");
  const [validurl, setValidURL] = useState(false);
  const [stackQuery, setStackQuery] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);

  const stackQueryRef: any = useRef();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    async function getRepos() {
      const user = (await supabase.auth.getUser()).data.user;
      octokit
        .request("GET /users/{username}/repos", {
          username: user?.user_metadata?.user_name,
          per_page: 100,
        })
        .then((data: any) => {
          console.log(data.data);
          setRepos(data.data);
        });
    }
    getRepos();
  }, []);
  return (
    <Box w={"80%"} m={"auto"}>
      <Header />
      <Flex align={"flex-start"} justify={"space-between"} gap={3} mt={5}>
        <Flex direction={"column"} w={"50%"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Publish A New Project 🚀{" "}
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            quisquam.
          </Text>
          <Box mt={5}>
            <Text fontSize={"xl"}>Todos</Text>
            <UnorderedList>
              <ListItem
                my={2}
                textDecoration={githubURL && "line-through"}
                color={githubURL && "gray.400"}
              >
                Select repository
              </ListItem>
              <ListItem
                my={2}
                textDecoration={projectName && "line-through"}
                color={projectName && "gray.400"}
              >
                Set project name
              </ListItem>
              <ListItem
                my={2}
                textDecoration={description && "line-through"}
                color={description && "gray.400"}
              >
                Set project description
              </ListItem>
              <ListItem
                my={2}
                textDecoration={validurl ? "line-through" : ""}
                color={validurl ? "gray.400" : ""}
              >
                Link to website (optional)
              </ListItem>
              <ListItem
                my={2}
                textDecoration={selectedTags.length > 0 ? "line-through" : ""}
                color={selectedTags.length > 0 ? "gray.400" : ""}
              >
                Select tech stack
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
        <Flex w={"50%"} justify={"center"}>
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Repository</Tab>
              <Tab isDisabled={!githubURL}>Details</Tab>
              <Tab isDisabled={!projectName || !description || !githubURL}>
                Tech stack
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {githubURL === "" && (
                  <Input
                    placeholder={"Search repository"}
                    my={2}
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
                    w={350}
                  >
                    <Flex
                      align={"center"}
                      bg={"#000"}
                      my={3}
                      w={"100%"}
                      h={"100%"}
                      p={0.5}
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
                        setDescription("");
                        setValidURL(false);
                      }}
                    />
                  </Button>
                )}
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
                        w={350}
                        key={i}
                      >
                        <Flex
                          align={"center"}
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
                          <Text color={"grey.100"}>bossoncode/</Text>
                          <Text>{repo.name}</Text>
                        </Flex>
                      </Button>
                    ))
                )}
                <Box>
                  <Button
                    disabled={!githubURL}
                    onClick={() => {
                      handleTabsChange(1);
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel>
                <Input
                  placeholder={"Project name"}
                  my={2}
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />
                <Input
                  placeholder={"Project description"}
                  my={2}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  placeholder={"Website"}
                  my={2}
                  onChange={(e) => {
                    setWebsiteURL(e.target.value);
                    setValidURL(testUrl(e.target.value));
                  }}
                />
                <Button
                  disabled={
                    !projectName ||
                    !description ||
                    (websiteURL !== "" && !validurl)
                  }
                  onClick={() => handleTabsChange(2)}
                >
                  Continue
                </Button>
              </TabPanel>
              <TabPanel>
                <Flex direction={"column"}>
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
                    my={4}
                    ref={stackQueryRef}
                    onChange={(e) => {
                      let timer;
                      if (timer) {
                        clearInterval(timer);
                      }
                      timer = setTimeout(() => {
                        setStackQuery(e.target.value);
                      }, 800);
                    }}
                  />
                  <Flex direction={"column"}>
                    {stackQuery !== "" &&
                      ts
                        .filter(
                          (t) =>
                            t.name.toLowerCase().includes(stackQuery) &&
                            !selectedTags.includes(t)
                        )
                        .map((tag, i) => (
                          <Tag
                            key={i}
                            my={2}
                            onClick={() => {
                              setSelectedTags([...selectedTags, tag]);
                              setTags([...tags, tag.name]);
                              setStackQuery("");
                              stackQueryRef.current.value = "";
                            }}
                          >
                            <Text>{tag.name}</Text>
                          </Tag>
                        ))}
                  </Flex>
                  <Button disabled={selectedTags.length < 1}>
                    Publish project
                  </Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddNewProject;
