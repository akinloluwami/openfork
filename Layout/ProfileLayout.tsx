// import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import GradientButton from "../components/GradientButton";
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
import Head from "next/head";
import { GoVerified } from "react-icons/go";
import Projects from "../components/Projects";
import ModalContainer from "../components/Major/ModalContainer";
import { supabase } from "../utils/supabaseClient";

interface UserData {
  name: string;
  user_name: string;
  avatar_url: any;
}
const ProfileLayout = ({
  user,
  router,
  children,
}: {
  user: any;
  router: string[];
  children: any;
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Heading>{user?.name}</Heading>
                <Flex align={"center"} my={1.5}>
                  <Text fontSize="15px" fontWeight="light">
                    @{user?.user_name}
                  </Text>
                  <Icon as={GoVerified} ml={1} />
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
          {(router && router[0]) == user?.user_name && (
            <GradientButton text="Edit my Profile" />
          )}
        </Flex>

        <Box p="30px 0">
          <Center>
            <Tabs variant={"soft-rounded"} colorScheme={"purple"} size={"sm"}>
              <TabList>
                <Link href="about">
                  <Tab>About</Tab>
                </Link>
                <Link href="project">
                  <Tab>Projects</Tab>
                </Link>
                <Link href="badges">
                  <Tab>Badges</Tab>
                </Link>
                <Link href="upvotes">
                  <Tab>Upvotes</Tab>
                </Link>
              </TabList>
              <TabPanels></TabPanels>
            </Tabs>
            {/* <TabPanel>
                  <Text>About</Text>
                  </TabPanel>
                  <TabPanel>
                  <UserProjects />
                </TabPanel>
                <TabPanel>
                  <Text>Badges</Text>
                </TabPanel>
                <TabPanel>
                  <Text>Upvotes</Text>
                </TabPanel> */}
          </Center>
          <Center>
            <Box> {children}</Box>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default ProfileLayout;
