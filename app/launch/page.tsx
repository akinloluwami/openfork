"use client";

import { SelectRepository } from "@/components/select-repo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Head from "next/head";
import { useState } from "react";
import { BiSolidCheckSquare } from "react-icons/bi";

interface NewProjectProps {
  name: string;
  description: string;
  website: string;
  repository: string;
  techStack: string[];
}

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

  return (
    <div className="flex">
      <Head>
        <title>Launch • Openfork</title>
      </Head>
      <div className="w-[35%] px-10 border-r pt-10 h-[calc(100vh-5rem)]">
        <h1 className="text-3xl font-semibold">Launch</h1>
        <p>Let's get you started.</p>
        <div className="mt-10">
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
      <div className="w-[65%] p-10 flex flex-col gap-8">
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
          <div className="flex flex-col gap-3 mt-3">
            <Input placeholder="Project name" value={project.name} />
            <Textarea
              placeholder="Project description"
              value={project.description}
            />
            <Input placeholder="Project website" value={project.website} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Launch;
