import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";

const Hero: NextPage = () => {
  return (
    <Box p="5%">
      <Flex
        justify="center"
        textAlign="center"
        align="center"
        direction="column"
      >
        <Heading fontSize="50px" maxW="600px" m="auto">
          Open source has never been easier...
        </Heading>
        <Text maxW="600px" m="10px auto" fontSize="13px">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          dolorem inventore alias assumenda quisquam qui repellat eaque illo
          architecto dolor iur
        </Text>

        <Button fontSize="13px" bg="darkorange">
          {/**LOGO**/} <Text>Sign in with Github</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default Hero;
