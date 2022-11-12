import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Head from "next/head";
const Home: NextPage = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);
  return (
    <Box>
      <Head>
        <title>
          Openfork - Opensource projects you can actually contribute to.
        </title>
        <meta
          property="og:image"
          content="https://db5pap001files.storage.live.com/y4mCrJoWuRk2wlojIlspEW8fZVnTwzZCLr7NhEDO1vSEp5Ayo19hYkX8mmxZ15YIZSEC3PQ5DMNvYodJec2XNCDwhRoQZNYeQKuTQyBCoyao6lzQ2WeYZi0coXdbcg63R1Aa2Z1qfnWkL7_tdOplJpmgXLOKcBvzD97txNFyWHC9IyjJhbHgBi1Izq5Cmd5qGxZ?width=1200&height=627&cropmode=none"
        />
        <meta
          property="og:image:secure_url"
          content="https://db5pap001files.storage.live.com/y4mCrJoWuRk2wlojIlspEW8fZVnTwzZCLr7NhEDO1vSEp5Ayo19hYkX8mmxZ15YIZSEC3PQ5DMNvYodJec2XNCDwhRoQZNYeQKuTQyBCoyao6lzQ2WeYZi0coXdbcg63R1Aa2Z1qfnWkL7_tdOplJpmgXLOKcBvzD97txNFyWHC9IyjJhbHgBi1Izq5Cmd5qGxZ?width=1200&height=627&cropmode=none"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta
          property="og:image:alt"
          content="Openfork - Opensource projects you can actually contribute to."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@openfork" />
        <meta name="twitter:title" content="Openfork" />
        <meta
          name="twitter:description"
          content="Opensource project you can actually contribute to."
        />
        <meta
          name="twitter:image"
          content="https://db5pap001files.storage.live.com/y4mCrJoWuRk2wlojIlspEW8fZVnTwzZCLr7NhEDO1vSEp5Ayo19hYkX8mmxZ15YIZSEC3PQ5DMNvYodJec2XNCDwhRoQZNYeQKuTQyBCoyao6lzQ2WeYZi0coXdbcg63R1Aa2Z1qfnWkL7_tdOplJpmgXLOKcBvzD97txNFyWHC9IyjJhbHgBi1Izq5Cmd5qGxZ?width=1200&height=627&cropmode=none"
        />
      </Head>
      <Header />
      <Hero />
      <Projects />
    </Box>
  );
};

export default Home;
