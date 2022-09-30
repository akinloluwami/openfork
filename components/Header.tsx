import type { NextPage } from "next";
import { Flex, Box, Image, Link, Button, Text } from "@chakra-ui/react";

const Header: NextPage = () => {
  return (
    <Box>
      <Flex align="center" p="20px 0" justify="space-around" w="100%">
        <Image src="/vercel.svg" w="150px" />
        <Flex align="center" gap="10px">
          <Link fontSize="14px">Contribute</Link>
          <Button fontSize="13px" bg="darkorange">
            {/**LOGO**/} <Text>Sign in with Github</Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
