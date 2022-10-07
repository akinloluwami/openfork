import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import userInfo from "../utils/userInfo";

const ProfileOptions = () => {
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
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileOptions;
