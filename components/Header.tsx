import { Flex, Box, Image, Link, Button, Text, Avatar } from "@chakra-ui/react";
import userInfo from "../utils/userInfo";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import ContainerLayout from "../Layout/ContainerLayout";
import { gradient } from "../styles/gradient";
import { signInWithGithub } from "../utils/supabase/auth";
import Notifications from "./Notifications";
import ProfileOptions from "./ProfileOptions";
import { useRouter } from "next/router";
const Header = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    setUser(userInfo());
  }, []);
  return (
    <ContainerLayout>
      <Flex align="center" py={5} justify="space-between" px="20px">
        <Image src="/openfork.svg" w={["120px", "150px"]} alt="" />
        {user ? (
          <Flex align="center" gap="10px">
            <Box>
              <Flex gap="20px" justify="space-around" align="center">
                <Notifications />
                <ProfileOptions />
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex align="center" gap="10px">
            <Link fontSize="14px">Contribute</Link>
            <Button
              leftIcon={<FaGithub />}
              bgGradient={gradient}
              variant="solid"
              size="sm"
              onClick={() => {
                signInWithGithub();
              }}
            >
              Sign In
            </Button>
          </Flex>
        )}
      <Flex
        align="center"
        py={5}
        justify="space-between"
        px="20px"
      >
        <Image src="/openfork.svg" w={["120px", "150px"]} alt="" />

        {/* when logged in */}
        <Flex align="center" gap="10px">
          <Box>
            <Flex gap="20px" justify="space-around" align="center">
              <Notifications />
              <ProfileOptions />
            </Flex>
          </Box>
        </Flex>
        {/* when loged out */}
        {/* <Flex align="center" gap="10px">
          <Link fontSize="14px">Contribute</Link>
          <Button
            leftIcon={<FaGithub />}
            bgGradient={gradient}
            variant="solid"
            size="sm"
          >
            Sign In
          </Button>
        </Flex> */}
      </Flex>
    </ContainerLayout>
  );
};

export default Header;
