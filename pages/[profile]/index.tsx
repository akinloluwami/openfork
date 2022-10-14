import type { NextPage } from "next";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import Tag from "../../components/Tag";
import UserProjects from "../../components/Profile/UserProjects";
import Head from "next/head";
import { useRouter } from "next/router";
import ProfileLayout from "../../Layout/ProfileLayout";
import { supabase } from "../../utils/supabaseClient";
import { Text } from "@chakra-ui/react";

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
  console.log(data);
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  let { data: profiles } = await supabase.from("profiles").select("*");
  const pathsWithParams = profiles.map((profile) => ({
    params: { profile: profile.username },
  }));
  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

const Profile: NextPage = ({ data }) => {
  const router = useRouter();
  const { profile } = router.query;
  const profileRoute = profile as unknown as string[];
  const user = data;
  //jjjjj
  // async function updateProfile() {
  //   try {
  //     const user = (await supabase.auth.getUser()).data.user;
  //     const updates = {
  //       id: user?.id,
  //       username: user?.user_metadata?.user_name,
  //       updated_at: new Date(),
  //       avatar_url: user?.user_metadata?.avatar_url,
  //       display_name: user?.user_metadata.full_name,
  //     };

  //     let { data, error } = await supabase.from("profiles").upsert(updates);
  //     if (data) {
  //       console.log(data);
  //     }
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // }

  return (
    <>
      <Head>
        <title>{user.display_name}'s profile on OpenFork | OpenFork</title>
      </Head>

      <ProfileLayout router={profileRoute} user={user}>
        {((profileRoute && profileRoute[1] == "about") ||
          (profileRoute && profileRoute[1] == undefined)) && (
          <Text>About User Here</Text>
        )}

        {/* <Button onClick={updateProfile}>Update Profile</Button> */}

        {profileRoute && profileRoute[1] == "projects" && <UserProjects />}

        {profileRoute && profileRoute[1] == "badges" && <Text>Badges</Text>}
        {profileRoute && profileRoute[1] == "upvotes" && <Text>Upvotes</Text>}
      </ProfileLayout>

      {/* <Header /> */}
    </>
  );
};

export default Profile;
