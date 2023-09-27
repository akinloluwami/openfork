"use client";

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
    repository: "ooo",
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
      <div className="w-[40%] px-10 border-r pt-10 h-[calc(100vh-5rem)]">
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
      <div className="w-[60%] p-10">
        <div className="">
          <h1 className="font-semibold text-2xl">Repository</h1>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default Launch;
