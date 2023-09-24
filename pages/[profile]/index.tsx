import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import GradientButton from "../../components/GradientButton";
import {
  Box,
  Flex,
  Heading,
  Text,
  Center,
  Icon,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import { GoVerified } from "react-icons/go";
import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const [currentUser, setCurrentUser] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      setCurrentUser((await supabase.auth.getUser()).data.user?.user_metadata);
    }
    getUser();
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
      <Head>
        <title>
          {user?.display_name} {`(@${user.username})`} | Openfork
        </title>
      </Head>
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

                <Text fontSize="16px">{user?.headline}</Text>
                <Flex fontSize="13px" gap="10px" m="10px 0">
                  <Text>Following: 69</Text>
                  <Text>Followers: 69k</Text>
                  <Text>Upvotes: 690k</Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>
          {currentUser?.user_name == user?.username ? (
            <Link href={"/profile/edit"} passHref>
              <Button>Edit my profile</Button>
            </Link>
          ) : (
            <GradientButton text={"Follow"} />
          )}
        </Flex>

        <Box p="30px 0">
          <Center>
            <Flex pb={10}>
              {pages.map((page, i) => (
                <Text
                  mx={5}
                  key={i}
                  bg={
                    router.asPath.split("/")[2] ===
                    page.title.toLocaleLowerCase()
                      ? "purple.500"
                      : !router.asPath.split("/")[2] && page.title === "About"
                      ? "purple.500"
                      : ""
                  }
                  px={2}
                  borderRadius={"xl"}
                >
                  <Link href={`/${user.username}${page.href}`}>
                    {page.title}
                  </Link>
                </Text>
              ))}
            </Flex>
          </Center>
          <Center>
            {!children && <Text>{user?.bio}</Text>}
            <Box> {children}</Box>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
