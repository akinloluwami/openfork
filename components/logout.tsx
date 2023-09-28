"use client";

import { DropdownMenuItem } from "./ui/dropdown-menu";
import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    await axios.post("/auth/logout");
    window.location.reload();
  };

  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
}

export default Logout;
