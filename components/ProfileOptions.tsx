import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signout } from "../utils/supabase/auth";
import userInfo from "../utils/userInfo";

interface userProps {
  avatar_url: string;
  user_name: string;
}

const ProfileOptions = () => {
  const [user, setUser] = useState<userProps>();
  const router = useRouter();
  useEffect(() => {
    setUser(userInfo());
  }, []);
  return (
    <Menu isLazy>
      <MenuButton>
        <Avatar size={["md"]} src={user?.avatar_url} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link href={`/${user?.user_name}`}>Profile</Link>
        </MenuItem>
        <MenuItem>My Projects</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            signout();
            router.reload();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileOptions;
