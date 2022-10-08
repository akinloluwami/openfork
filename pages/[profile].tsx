import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import userInfo from "../utils/userInfo";
import Head from "next/head";
const Profile: NextPage = () => {
  const [user, setUser] = useState({});
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
        <Flex justify="space-between" gap="30px" align="center" wrap="wrap">
          <Flex align="center" gap="10px">
            <Avatar src={user?.avatar_url} />
            <Box>
              <Text fontSize="12px" fontWeight="thin">
                @{user?.user_name}
              </Text>
              <Heading>{user?.name}</Heading>
              <Text fontSize="16px">Trying OpenSource</Text>
              <Flex fontSize="13px" gap="10px" m="10px 0">
                <Text>Contributions: 13</Text>
                <Text>upvotes: 230</Text>
              </Flex>
            </Box>
          </Flex>

          <Button
            bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
            fontSize="13px"
          >
            Edit my profile
          </Button>
        </Flex>

        <Box p="30px 0">
          <Flex gap="15px" m="15px 0">
            <Tag stackName="About" />
            <Tag stackName="Projects" />
            <Tag stackName="Upvotes" />
            <Tag stackName="Bookmarks" />
          </Flex>
          <Box>
            <Heading fontSize="25px">About</Heading>
            <Box p="20px 0">
              <Text opacity=".5" fontSize="12px">
                Bio helps fellow contributors get a better ideal of you.{" "}
                <Link color="#d53f8c" opacity=".5" fontSize="12px">
                  Click to Edit
                </Link>
              </Text>
            </Box>
          </Box>
          <Box>
            <Heading fontSize="25px">Badges</Heading>
            <Box p="20px 0">
              <Text opacity=".5" fontSize="12px">
                You do not have badges yet
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
