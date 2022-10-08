import {
  Box,
  Button,
  Flex,
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
import React from "react";
import Header from "../../components/Header";

const AddNewProject = () => {
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
          <Tabs>
            <TabList>
              <Tab>Repository</Tab>
              <Tab>Details</Tab>
              <Tab>Tech stack</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input placeholder={"Search repository"} my={2} />
                <Button>Continue</Button>
              </TabPanel>
              <TabPanel>
                <Input placeholder={"Project name"} my={2} />
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
