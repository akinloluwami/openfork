"use client";

import { SelectRepository } from "@/components/select-repo";
import SelectTechStack from "@/components/select-tech-stack";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { axios } from "@/lib/axios";
import { ProjectProps } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiSolidCheckSquare } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { HiLightningBolt } from "react-icons/hi";
import { SiFacebook, SiLinkedin, SiTwitter, SiX } from "react-icons/si";

function Launch() {
  const [project, setProject] = useState<ProjectProps>({
    name: "",
    description: "",
    website: "",
    repository: "",
    techStack: [],
    fullName: "",
  });

  const checkLists = [
    {
      name: "Select repository",
      isDone: project?.repository !== "",
    },
    {
      name: "Project info",
      isDone: project?.name !== "" && project?.description !== "",
    },
    {
      name: "Tech stack",
      isDone: project.techStack.length > 0,
    },
  ];

  const [projectResponse, setProjectResponse] = useState<any>();

  const percentageDone =
    (checkLists.reduce((acc, item) => (item.isDone ? acc + 1 : acc), 0) /
      checkLists.length) *
    100;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [launching, setLaunching] = useState(false);

  const handleLaunchProject = async () => {
    setLaunching(true);
    try {
      const { data } = await axios.post("/project", project);
      setIsDialogOpen(true);
      setProjectResponse(data);
      setProject({
        name: "",
        description: "",
        website: "",
        repository: "",
        techStack: [],
        fullName: "",
      });
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLaunching(false);
    }
  };

  const shareToSocials = [
    {
      name: "X",
      url: "https://twitter.com/intent/tweet?url=https://launch.openfork.com&text=https://launch.openfork.com",
      icon: <SiX />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/sharing/share-offsite/?url=https://launch.openfork.com",
      icon: <SiLinkedin />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/sharer/sharer.php?u=https://launch.openfork.com",
      icon: <SiFacebook />,
    },
  ];

  return (
    <div className="flex">
      <Toaster />
      <Head>
        <title>Launch • Openfork</title>
      </Head>
      <div className="w-[35%] px-10 border-r pt-10 h-[calc(100vh-5rem)] fixed">
        <h1 className="text-3xl font-semibold">Launch</h1>
        <p>Let's get you started.</p>

        <div className="mt-10">
          <Progress value={percentageDone} />
          <ul>
            {checkLists.map((item, index) => (
              <li key={index} className="flex items-center my-5">
                <span>
                  <BiSolidCheckSquare
                    size={25}
                    className={`${
                      item.isDone ? "text-orange-500" : "text-gray-400"
                    } mr-1`}
                  />
                </span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[65%] p-10 flex flex-col gap-8 ml-[35%] max-w-[550px]">
        <div className="">
          <h1 className="font-semibold text-2xl">Repository</h1>
          <SelectRepository
            onSelectRepository={(repository) =>
              setProject({
                ...project,
                repository: repository.html_url,
                name: repository.name,
                description: repository.description,
                website: repository.homepage,
                fullName: repository.full_name,
              })
            }
            selectedRepoFullName={project.fullName}
          />
        </div>
        <div className="">
          <h1 className="font-semibold text-2xl">Project info</h1>
          <div className="flex flex-col gap-5 mt-3">
            <div className="">
              <p>Project name</p>
              <Input
                placeholder="Project name"
                value={project.name}
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
            </div>
            <div className="">
              <p>Description</p>
              <Textarea
                placeholder="Project description"
                value={project.description}
                className="h-44"
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
              />
            </div>
            <div className="">
              <p>Website</p>
              <Input
                placeholder="Project website"
                value={project.website}
                onChange={(e) =>
                  setProject({ ...project, website: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-2xl">Tech stack</h1>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {project.techStack.map((stack, i) => (
              <Button variant="outline" key={i}>
                {stack}
              </Button>
            ))}
            <SelectTechStack
              onSelectStack={(techStack) =>
                setProject({
                  ...project,
                  techStack: [...project.techStack, techStack],
                })
              }
            />
          </div>
        </div>

        <Button
          className="!bg-orange-600"
          disabled={
            checkLists.reduce(
              (acc, item) => (item.isDone ? !acc : acc),
              true
            ) || launching
          }
          onClick={handleLaunchProject}
        >
          <span className="mr-2">
            {launching ? (
              <CgSpinner className="animate-spin" />
            ) : (
              <HiLightningBolt />
            )}{" "}
          </span>
          Launch
          {launching ? "ing..." : ""}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your project has been lauchced! 🎉</DialogTitle>
              <DialogDescription>
                Share your project on your socials, let the world know what you
                are building.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3">
              {shareToSocials.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
            <Link href={`/p/${projectResponse?.slug}`}>
              <Button variant="outline">View project page</Button>
            </Link>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Launch;
