import { Flex, Box, Image, Link, Button, Text } from "@chakra-ui/react";
import Avatar from "./Avatar";
import { FaGithub, FaAngleDown, FaBell } from "react-icons/fa";
const Header = () => {
  return (
    <Box>
      <Flex align="center" p="20px 0" justify="space-around" w="100%">
        <Image src="/vercel.svg" w="150px" />

        {/* when logged in */}
        <Flex align="center" gap="10px">
          <Box fontSize="20px" position="relative">
            <FaBell />
            <Box
              bg="red"
              w="10px"
              h="10px"
              position="absolute"
              top="-2px"
              right="-2px"
              borderRadius="10px"
            >
              {" "}
            </Box>
          </Box>
          <Box>
            <Flex
              bg="#222"
              p="6px"
              borderRadius="20px"
              w="70px"
              gap="10px"
              justify="space-around"
              align="center"
            >
              <Avatar src="/user.png" size={30} />
              <FaAngleDown />
            </Flex>
          </Box>
        </Flex>
        {/* when loged out */}
        {/* <Flex align="center" gap="10px">
          <Link fontSize="14px">Contribute</Link>
          <Button fontSize="13px" bg="darkorange">
           <FaGithub /> <Text mx="5px"> Sign in with Github</Text>
          </Button>
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Header;
