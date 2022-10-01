import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({ todos }: any) => {
  return (
    <Box>
      <Head>
        <title>Find, contribute to and sponsor open-source projects</title>
      </Head>
      <Text>Hello World</Text>
    </Box>
  );
};

export default Home;
