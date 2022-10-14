// import type { NextPage } from "next";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import GradientButton from "../../components/GradientButton";
import Tag from "../../components/Tag";
import UserProjects from "../../components/Profile/UserProjects";
import {
  Box,
  Flex,
  Heading,
  Text,
  Tabs,
  Tab,
  TabList,
  Center,
  Icon,
  TabPanels,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { GoVerified } from "react-icons/go";
import Projects from "../../components/Projects";
import ModalContainer from "../../components/Major/ModalContainer";
import { supabase } from "../../utils/supabaseClient";
import { useEffect } from "react";
import Link from "next/link";

interface UserData {
  name: string;
  user_name: string;
  avatar_url: any;
}

export async function getStaticProps(content: any) {
  let { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", content.params.profile)
    .single();
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  let { data: profiles } = await supabase.from("profiles").select("*");
  const pathsWithParams = profiles!.map((profile) => ({
    params: { profile: profile.username },
  }));
  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

const Profile = ({ data, children }: { data: any; children: any }) => {
  const user = data;
  useEffect(() => {
    console.log(data);
  }, []);

  const pages = [
    {
      title: "About",
      href: "/",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Badges",
      href: "/badges",
    },
    {
      title: "Upvotes",
      href: "/upvotes",
    },
  ];

  return (
    <>
      <Header />
      <Box p="25px 10%">
        <Flex justify="center" gap="30px" align="center" wrap="wrap">
          <Flex align="center">
            <Flex>
              <Box mr={10}>
                <Avatar src={user?.avatar_url} />
              </Box>
              <Box>
                <Heading>{user?.display_name}</Heading>
                <Flex align={"center"} my={1.5}>
                  <Text fontSize="15px" fontWeight="light">
                    @{user?.username}
                  </Text>
                  {user?.is_verified && <Icon as={GoVerified} ml={1} />}
                </Flex>

                <Text fontSize="16px">Software Engineer</Text>
                <Flex fontSize="13px" gap="10px" m="10px 0">
                  <Text>Following: 69</Text>
                  <Text>Followers: 69k</Text>
                  <Text>Upvotes: 690k</Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>
          {/* {(router && router[0]) == user?.user_name && (
            <GradientButton text="Edit my Profile" />
          )} */}
        </Flex>

        <Box p="30px 0">
          <Center>
            <Flex>
              {pages.map((page, i) => (
                <Text mx={5} key={i}>
                  <Link href={`/${user.username}${page.href}`}>
                    {page.title}
                  </Link>
                </Text>
              ))}
            </Flex>
          </Center>
          <Center>
            <Box> {children}</Box>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
