import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
const Home: NextPage = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);
  return (
    <Box>
      <Header />
      <Hero />


      <Projects />
    </Box>
  );
};

export default Home;
