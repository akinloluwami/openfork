import Link from "next/link";
import { Button } from "./ui/button";
import { SiGithub } from "react-icons/si";
import { useUser } from "@/stores/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
