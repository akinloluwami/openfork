import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Button from "../components/Button";
import Tag from "../components/Tag";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import userInfo from "../utils/userInfo";
import Head from "next/head";

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
        <meta
          name="viewport"
          content="initial-scale=1.0,  width=device-width"
        />
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
                <Text fontSize="12px" fontWeight="thin">
                  @{user?.user_name}
                </Text>
                <Text fontSize="16px">Trying OpenSource</Text>
                <Flex fontSize="13px" gap="10px" m="10px 0">
                  <Text>Contributions: 13</Text>
                  <Text>upvotes: 230</Text>
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
            </Tabs>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
