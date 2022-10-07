import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { signout } from "../utils/supabase/auth";
import userInfo from "../utils/userInfo";

const ProfileOptions = () => {
  const router = useRouter();
  return (
    <Menu isLazy>
      <MenuButton>
        <Avatar size={["md"]} src={userInfo()?.avatar_url} />
      </MenuButton>
      <MenuList>
        {/* MenuItems are not rendered unless Menu is open */}
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Projects</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            signout();
            router.reload(window.location.pathname);
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileOptions;
