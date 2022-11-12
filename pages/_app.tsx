import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import Script from "next/script";
import Head from "next/head";
const colors = {
  brand: {
    accent: "#1a365d",
  },
};

const progress = new ProgressBar({
  size: 2,
  color: "#805ad5",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const theme = extendTheme({ colors });
function MyApp({ Component, pageProps }: AppProps) {
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
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
