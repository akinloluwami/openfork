import { Button } from "@/components/ui/button";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Openfork",
  description: "Opensource projects your can actually contribute to.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
