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
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import Header from "../../components/Header";
import userInfo from "../../utils/userInfo";

interface RepoData {
  name: string;
  svn_url: string;
}

const AddNewProject = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");
  const [projectName, setProjectName] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(["react", "typescript"]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    fetch(`https://api.github.com/users/${userInfo().user_name}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
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
              <ListItem my={2}>Select repository</ListItem>
              <ListItem my={2}>Set project name</ListItem>
              <ListItem my={2}>Set project description</ListItem>
              <ListItem my={2}>Link to website (optional)</ListItem>
              <ListItem my={2}>Select tech stack</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
        <Flex w={"50%"} justify={"center"}>
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Repository</Tab>
              <Tab isDisabled={!githubURL}>Details</Tab>
              <Tab>Tech stack</Tab>
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
                      <Text color={"grey.100"}>bossoncode/</Text>
                      <Text>{projectName}</Text>
                    </Flex>
                    <CloseButton
                      onClick={() => {
                        setGithubURL("");
                        setProjectName("");
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
                />
                <Input placeholder={"Project description"} my={2} />
                <Input placeholder={"Website"} my={2} />
                <Button>Continue</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddNewProject;
