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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { axios } from "@/lib/axios";
import { NewProjectProps } from "@/types";
import Head from "next/head";
import { useState } from "react";
import { BiSolidCheckSquare } from "react-icons/bi";
import { HiLightningBolt } from "react-icons/hi";

function Launch() {
  const [project, setProject] = useState<NewProjectProps>({
    name: "",
    description: "",
    website: "",
    repository: "",
    techStack: [],
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

  const percentageDone =
    (checkLists.reduce((acc, item) => (item.isDone ? acc + 1 : acc), 0) /
      checkLists.length) *
    100;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLaunchProject = async () => {
    try {
      await axios.post("/projects", project);
      setIsDialogOpen(true);
    } catch (error) {}
  };

  return (
    <div className="flex">
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
              })
            }
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
          disabled={checkLists.reduce(
            (acc, item) => (item.isDone ? !acc : acc),
            true
          )}
        >
          <HiLightningBolt /> Launch
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Launch;
