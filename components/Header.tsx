import { Flex, Box, Image, Link, Button, Text } from "@chakra-ui/react";
import Avatar from "./Avatar";
import { FaGithub, FaAngleDown, FaBell } from "react-icons/fa";
import { gradient } from "../styles/gradient";
const Header = () => {
  return (
    <Box>
      <Flex align="center" py={5} justify="space-around" w="100%">
        <Image src="/openfork.svg" w="150px" />

        {/* when logged in */}
        <Flex align="center" gap="10px">
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
          <Button
            leftIcon={<FaGithub />}
            bgGradient={gradient}
            variant="solid"
            size="sm"
          >
            Sign In
          </Button>
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Header;
