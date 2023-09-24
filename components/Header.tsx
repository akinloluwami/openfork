import { Flex, Box, Image, Button, Text, Avatar } from "@chakra-ui/react";
import userInfo from "../utils/userInfo";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import ContainerLayout from "../layouts/ContainerLayout";
import { gradient } from "../styles/gradient";
import { signInWithGithub } from "../utils/supabase/auth";
import Notifications from "./Notifications";
import ProfileOptions from "./ProfileOptions";
// import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
const Header = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUser() {
      await supabase.auth.getUser().then((data) => {
        setUser(data.data.user?.user_metadata);
      });
    }
    getUser();
  }, []);
  return (
    <ContainerLayout>
      <Flex align="center" py={5} justify="space-between" px="20px">
        <Link href={"/"}>
          <Image
            src="/openfork.svg"
            w={["120px", "150px"]}
            alt=""
            cursor={"pointer"}
          />
        </Link>
        {user ? (
          <Flex align="center" gap="10px">
            <Box>
              <Flex gap="20px" justify="space-around" align="center">
                {/* <Notifications /> */}
                <ProfileOptions />
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex align="center" gap="10px">
            {/* <Link href={"/"}>
              <Text fontSize="14px">Contribute</Text>
            </Link> */}
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
      </Flex>
    </ContainerLayout>
  );
};

export default Header;
