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
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import userInfo from "../utils/userInfo";
import Head from "next/head";
import { useRouter } from "next/router";
import ProfileLayout from "../Layout/ProfileLayout";
import { supabase } from "../utils/supabaseClient";

interface UserData {
  name: string;
  user_name: string;
  avatar_url: any;
}
const Profile: NextPage = () => {
  const router = useRouter();
  const { profile } = router.query;
  const profileRoute = profile as unknown as string[];
  const [user, setUser] = useState<UserData>();

  async function getProfile() {
    try {
      const user: any = (await supabase.auth.getUser()).data.user;
      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.log("help");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function updateProfile() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      const updates = {
        id: user?.id,
        username: user?.user_metadata?.user_name,
        updated_at: new Date(),
        avatar_url: user?.user_metadata?.avatar_url,
        display_name: user?.user_metadata.full_name,
      };

      let { data, error } = await supabase.from("profiles").upsert(updates);
      if (data) {
        console.log(data);
      }
      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Head>
        <title>
          {profileRoute && profileRoute[0]}'s profile on OpenFork | OpenFork
        </title>
      </Head>
      {(profileRoute && profileRoute[0]) != user?.username ? (
        <Text>User not found</Text>
      ) : (
        <ProfileLayout router={profileRoute} user={user}>
          {((profileRoute && profileRoute[1] == "about") ||
            (profileRoute && profileRoute[1] == undefined)) && (
            <Text>About User Here</Text>
          )}
          <Button onClick={updateProfile}>Update</Button>

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
