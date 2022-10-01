import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
const Profile: NextPage = () => {
  return (
    <Box p="5%">
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="10px">
          <Avatar src="/user.png" />
          <Box>
            <Text fontSize="12px" fontWeight="thin">
              @username
            </Text>
            <Heading>Timileyin Oyelekan</Heading>
            <Text fontSize="16px">Trying OpenSource</Text>
            <Flex fontSize="13px" gap="10px" m="10px 0">
              <Text>Contributions: 13</Text>
              <Text>upvotes: 230</Text>
            </Flex>
          </Box>
        </Flex>

        <Button color="#000" fontSize="13px">
          Edit my profile
        </Button>
      </Flex>

      <Box>
        <Flex gap="15px" m="15px 0">
          <Text
            border="1px solid grey"
            p="6px 12px"
            borderRadius="20px"
            fontSize="12px"
            display="block"
          >
            About
          </Text>
          <Text
            border="1px solid grey"
            p="6px 12px"
            borderRadius="20px"
            fontSize="12px"
            display="block"
          >
            Activity
          </Text>
          <Text
            border="1px solid grey"
            p="6px 12px"
            borderRadius="20px"
            fontSize="12px"
            display="block"
          >
            Upvotes
          </Text>
          <Text
            border="1px solid grey"
            p="6px 12px"
            borderRadius="20px"
            fontSize="12px"
            display="block"
          >
            Bookmarks
          </Text>
        </Flex>
        <Box>
          <Heading fontSize="25px">About</Heading>
          <Box p="20px 0"></Box>
        </Box>
        <Box>
          <Heading fontSize="25px">Badges</Heading>
          <Box p="20px 0"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
