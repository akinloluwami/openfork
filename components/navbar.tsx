"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SiGithub } from "react-icons/si";
import { useUser } from "@/stores/useUser";

export default function Navbar() {
  const { id, name, image, username } = useUser();
  return (
    <div className="flex items-center justify-between py-5 px-10">
      <div className="flex items-center gap-20">
        <div className="">
          <h1 className="font-semibold text-2xl">Openfork</h1>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/">Projects</Link>
          <Link href="/people">People</Link>
        </div>
      </div>
      {id ? (
        <></>
      ) : (
        <Link href={"/auth/github"}>
          <Button>
            <SiGithub className="mr-2" />
            Connect with GitHub
          </Button>
        </Link>
      )}
    </div>
  );
}
