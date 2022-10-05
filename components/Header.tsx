import { Flex, Box, Image, Link, Button, Text, Avatar } from "@chakra-ui/react";
import ContainerLayout from "../Layout/ContainerLayout";
import { gradient } from "../styles/gradient";
import Notifications from "./Notifications";
import ProfileOptions from "./ProfileOptions";
const Header = () => {
  return (
    <ContainerLayout>
      <Flex
        align="center"
        py={5}
        justify={["space-between", "space-around"]}
        px={["20px", "0"]}
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
