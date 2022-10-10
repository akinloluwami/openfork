import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaGithub, FaAngleDown, FaBell } from "react-icons/fa";

const Notifications = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box>
      <Box ref={btnRef} cursor={"pointer"}>
        <FaBell
          onClick={onOpen}
          style={{
            fontSize: "25px",
          }}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notifications</DrawerHeader>

          <DrawerBody>
            <Text>No notifications...we're currently working on this</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Notifications;
