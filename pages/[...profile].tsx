import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Tag from "../components/Tag";
import UserProjects from "../components/Profile/UserProjects";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Tabs,
  Tab,
  TabList,
  Center,
  Icon,
  TabPanels,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import userInfo from "../utils/userInfo";
import Head from "next/head";
import { useRouter } from "next/router";
import ProfileLayout from "../Layout/ProfileLayout";
// import { GoVerified } from "react-icons/go";
// import Projects from "../components/Projects";
// import ModalContainer from "../components/Major/ModalContainer";

interface UserData {
  name: string;
  user_name: string;
  avatar_url: any;
}
const Profile: NextPage = () => {
  const router = useRouter();
  const { profile } = router.query;
  const profileRoute = profile as unknown as string[];
  console.log(profileRoute);
  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    setUser(userInfo());
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>
          {profileRoute && profileRoute[0]}'s profile on OpenFork | OpenFork
        </title>
      </Head>
      {(profileRoute && profileRoute[0]) != user?.user_name ? (
        <Text>User not found</Text>
      ) : (
        <ProfileLayout router={profileRoute} user={user}>
          {((profileRoute && profileRoute[1] == "about") ||
            (profileRoute && profileRoute[1] == undefined)) && (
            <Text>About User Here</Text>
          )}

          {profileRoute && profileRoute[1] == "projects" && <UserProjects />}

          {profileRoute && profileRoute[1] == "badges" && <Text>Badges</Text>}
          {profileRoute && profileRoute[1] == "upvotes" && <Text>Upvotes</Text>}
        </ProfileLayout>
      )}
      {/* <Header /> */}
    </>
  );
};

export default Profile;
