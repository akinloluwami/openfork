import React, { useEffect, useState } from "react";
import ContainerLayout from "../Layout/ContainerLayout";
import Header from "../components/Header";
import Head from "next/head";
import userInfo from "../utils/userInfo";
const Username = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userInfo());
  }, []);
  return (
    <ContainerLayout>
      <Head>
        <title>{user?.name}'s profile on OpenFork | OpenFork</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
    </ContainerLayout>
  );
};

export default Username;
