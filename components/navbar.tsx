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
import { HiLightningBolt } from "react-icons/hi";

export default function Navbar() {
  const { id, name, image, username } = useUser();
  return (
    <div className="flex items-center justify-between h-20 px-10 border-b">
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
        <div className="flex items-center gap-5">
          <Link
            href={"/launch"}
            className="text-sm flex items-center gap-1 hover:text-orange-500"
          >
            <HiLightningBolt />
            Launch
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>
                  {name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
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
        </div>
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
