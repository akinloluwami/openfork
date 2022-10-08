import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Button from "../components/Button";
import Tag from "../components/Tag";
import UserProjects from "../components/Profile/UserProjects";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Tabs,
  Tab,
  TabList,
  Center,
  Icon,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import userInfo from "../utils/userInfo";
import Head from "next/head";
import { GoVerified } from "react-icons/go";
import Projects from "../components/Projects";

interface UserData {
  name: string;
  user_name: string;
  avatar_url: any;
}
const Profile: NextPage = () => {
  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    setUser(userInfo());
  }, []);
  return (
    <>
      <Head>
        <title>{user?.name}'s profile on OpenFork | OpenFork</title>
      </Head>
      <Header />
      <Box p="25px 10%">
        <Flex justify="center" gap="30px" align="center" wrap="wrap">
          <Flex align="center">
            <Flex>
              <Box mr={10}>
                <Avatar src={user?.avatar_url} />
              </Box>
              <Box>
                <Heading>{user?.name}</Heading>
                <Flex align={"center"} my={1.5}>
                  <Text fontSize="15px" fontWeight="light">
                    @{user?.user_name}
                  </Text>
                  <Icon as={GoVerified} ml={1} />
                </Flex>

                <Text fontSize="16px">Software Engineer</Text>
                <Flex fontSize="13px" gap="10px" m="10px 0">
                  <Text>Following: 69</Text>
                  <Text>Followers: 69k</Text>
                  <Text>Upvotes: 690k</Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>
          <Button
            ml={20}
            bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
            fontSize="13px"
            p={0.5}
            w={150}
          >
            <Flex
              align={"center"}
              justify={"center"}
              bg={"#000"}
              w={"100%"}
              h={"100%"}
              p={0.5}
              borderRadius={"5px"}
            >
              <Text>Edit my profile</Text>
            </Flex>
          </Button>
        </Flex>

        <Box p="30px 0">
          <Center>
            <Tabs variant={"soft-rounded"} colorScheme={"purple"} size={"sm"}>
              <TabList>
                <Tab>About</Tab>
                <Tab>Projects</Tab>
                <Tab>Badges</Tab>
                <Tab>Upvotes</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text>About</Text>
                </TabPanel>
                <TabPanel>
                  <UserProjects />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
