import type { NextPage } from "next";
import Header from "../components/Header";
import {
  Flex,
  Box,
  Heading,
  List,
  Link,
  ListItem,
  Button,
} from "@chakra-ui/react";

const Setting: NextPage = () => {
  return (
    <>
      <Header />
      <Box p="10px 5%">
        <Flex gap="30px" justify="space-around">
          <Box>
            <Heading>Settings</Heading>
            <List m="15px 0" fontSize="14px" gap="20px">
              <ListItem m="14px 0">
                {/* active link */}
                <Link color="#d53f8c">Public Profile</Link>
              </ListItem>
              <ListItem m="14px 0">
                <Link>Account Setting</Link>
              </ListItem>
              <ListItem m="14px 0">
                <Link>Notifications</Link>
              </ListItem>
              <ListItem m="14px 0">
                <Link>Privacy</Link>
              </ListItem>
            </List>
          </Box>

          <Box my="50px">
            <Heading fontSize="25px">Public Profile</Heading>
            <Box p="35px 0">
              <Button
                fontSize="13px"
                bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export default Setting;
