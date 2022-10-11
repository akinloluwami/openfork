import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Project from "./Project";

interface ProjectInterface {
  id: string;
  name?: string;
}

const UserProjects = () => {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        let { data: Projects, error } = await supabase
          .from("Projects")
          .select("*")
          .eq(
            "user",
            JSON.parse(
              localStorage.getItem(
                "sb-tebioleiibrvzamyqsia-auth-token"
              ) as string
            ).user.id
          );
        setProjects(Projects);
        console.log(Projects);
      } catch (err) {
        console.log(err);
        setProjects([]);
      }
    }
    fetchData();
  }, []);

  return (
    <Flex justify={"center"} align={"center"}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Center>
          <Link href={"/projects/new"}>
            <Button
              ml={20}
              bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
              fontSize="13px"
              p={0.5}
              w={150}
            >
              Add New Project
            </Button>
          </Link>
        </Center>
        {projects.length < 1 ? (
          <Text textAlign={"center"}>You don't have any project.</Text>
        ) : (
          projects.map((project: any) => (
            <Project key={project.id} name={project.name} />
          ))
        )}
      </Flex>
    </Flex>
  );
};
export default UserProjects;
