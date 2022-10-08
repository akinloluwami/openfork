import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import AddNewProject from "./AddNewProject";
import Project from "./Project";

const UserProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let { data: Projects, error } = await supabase
        .from("Projects")
        .select("*")
        .eq(
          "user",
          JSON.parse(localStorage.getItem("sb-tebioleiibrvzamyqsia-auth-token"))
            .user.id
        );
      setProjects(Projects);
      console.log(Projects);
    }
    fetchData();
  }, []);

  return (
    <Flex justify={"center"} align={"center"}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Center>
          <AddNewProject />
        </Center>
        {projects.length < 1 ? (
          <Text textAlign={"center"}>You don't have any project.</Text>
        ) : (
          projects.map((project) => (
            <Project key={project.id} name={project.name} />
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default UserProjects;
