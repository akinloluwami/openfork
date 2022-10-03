import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
const Profile: NextPage = () => {
  return (
    <Box p="5%">
      <Flex justify="space-between" gap="30px" align="center" wrap="wrap">
        <Flex align="center" gap="10px">
          <Avatar src="/user.png" />
          <Box>
            <Text fontSize="12px" fontWeight="thin">
              @username
            </Text>
            <Heading>Minimal Peace</Heading>
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
              You don't have badges yet
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
