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
import { supabase } from "../utils/supabaseClient";
import userInfo from "../utils/userInfo";

interface userProps {
  avatar_url: string;
  user_name: string;
}

const ProfileOptions = () => {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const getUser = async () => {
    const user: any = (await supabase.auth.getUser()).data.user;
    (await supabase.auth.getUser()) && setUserId(user?.id);
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    if (profiles) {
      setUser(profiles[0]);
    }
  };
  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Menu isLazy>
      <MenuButton>
        <Avatar size={["md"]} src={user?.avatar_url} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link href={`/${user?.username}`}>Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/${user?.username}/projects`}> My Projects</Link>
        </MenuItem>
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
