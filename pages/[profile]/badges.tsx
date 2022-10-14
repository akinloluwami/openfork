import { Text } from "@chakra-ui/react";
import React from "react";
import { supabase } from "../../utils/supabaseClient";
import Profile from "../[profile]/index";

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

const Badges = ({ data }: { data: any }) => {
  return (
    <Profile data={data}>
      <Text>Badges</Text>
    </Profile>
  );
};

export default Badges;
