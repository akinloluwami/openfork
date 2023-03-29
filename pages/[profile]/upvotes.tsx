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

const Upvotes = ({ data }: { data: any }) => {
  return (
    <Profile data={data}>
      <Text>Upvotes</Text>
    </Profile>
  );
};

export default Upvotes;
