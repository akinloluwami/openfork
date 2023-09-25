import Link from "next/link";
import { Button } from "./ui/button";
import { SiGithub } from "react-icons/si";

export default function Navbar() {
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
      <Link href={"/auth/github"}>
        <Button>
          <SiGithub className="mr-2" />
          Connect with GitHub
        </Button>
      </Link>
    </div>
  );
}
