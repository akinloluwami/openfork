import React from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { profile } from "console";
import Head from "next/head";
import Header from "../../components/Header";

// const getProject = async () => {
//   const router = useRouter();
//   let { data: user }: { data: any } = await supabase
//     .from("profiles")
//     .select("id")
//     .eq("username", router.query.profile);
//   const userId = user[0]?.id;
//   let { data: project }: { data: any } = await supabase
//     .from("projects")
//     .select("*")
//     .eq("user", userId)
//     .eq("slug", router.query.project);
//   return project;
// };

// export async function getStaticProps(context: any) {
//   let { data: user }: { data: any } = await supabase
//     .from("profiles")
//     .select("id")
//     .eq("username", context.params.profile);
//   const userId = user[0]?.id;
//   let { data: project }: { data: any } = await supabase
//     .from("projects")
//     .select("*")
//     .eq("user", userId)
//     .eq("slug", context.params.project);
//   return {
//     props: {
//       data: project,
//     },
//   };
// }

export async function getServerSideProps(context: any) {
  let { data: user }: { data: any } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", context.params.profile);
  const userId = user[0]?.id;
  let { data: project }: { data: any } = await supabase
    .from("projects")
    .select("*")
    .eq("user", userId)
    .eq("slug", context.params.project);
  return {
    props: {
      data: project[0],
    }, // will be passed to the page component as props
  };
}
const Project = ({ data }: { data: any }) => {
  console.log(data);
  const { name, description } = data;
  return (
    <div>
      <Head>
        <title>
          {name} - {description}
        </title>
      </Head>
      <Header />
    </div>
  );
};

export default Project;
