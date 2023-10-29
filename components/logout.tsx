"use client";

import { axios } from "@/lib/axios";
import { DropdownMenuItem } from "./ui/dropdown-menu";

function Logout() {
  const handleLogout = async () => {
    await axios.post("/auth/logout");
    window.location.reload();
  };

  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
}

export default Logout;
