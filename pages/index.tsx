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
    <>
      <Head>
        <title>
          Openfork - Opensource projects you can actually contribute to.
        </title>
        <meta
          property="og:image"
          content="https://tebioleiibrvzamyqsia.supabase.co/storage/v1/object/sign/avatars/openfork_OG.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL29wZW5mb3JrX09HLnBuZyIsImlhdCI6MTY2ODIzNzQzMCwiZXhwIjoxOTgzNTk3NDMwfQ.cLDjR7WlXJnv2nrL-luqjOgrIGggLuH_XM99-jBVfHA"
        />
        <meta
          property="og:image:secure_url"
          content="https://tebioleiibrvzamyqsia.supabase.co/storage/v1/object/sign/avatars/openfork_OG.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL29wZW5mb3JrX09HLnBuZyIsImlhdCI6MTY2ODIzNzQzMCwiZXhwIjoxOTgzNTk3NDMwfQ.cLDjR7WlXJnv2nrL-luqjOgrIGggLuH_XM99-jBVfHA"
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
          content="https://tebioleiibrvzamyqsia.supabase.co/storage/v1/object/sign/avatars/openfork_OG.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL29wZW5mb3JrX09HLnBuZyIsImlhdCI6MTY2ODIzNzQzMCwiZXhwIjoxOTgzNTk3NDMwfQ.cLDjR7WlXJnv2nrL-luqjOgrIGggLuH_XM99-jBVfHA"
        />
      </Head>
      <Box>
        <Header />
        <Hero />
        <Projects />
      </Box>
    </>
  );
};

export default Home;
