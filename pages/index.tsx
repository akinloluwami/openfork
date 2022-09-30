import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
const Home: NextPage = () => {
  return (
    <Box>
      <Header />
      <Hero />
    </Box>
  );
};

export default Home;
