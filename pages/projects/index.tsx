import Head from "next/head";
import React from "react";
import Header from "../../components/Header";
import Projects from "../../components/Projects";
import ContainerLayout from "../../layouts/ContainerLayout";

const index = () => {
  return (
    <ContainerLayout>
      <Header />
      <Head>
        <title>Open-source projects - Openfork</title>
      </Head>
      <Projects />
    </ContainerLayout>
  );
};

export default index;
