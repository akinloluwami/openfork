"use client";

import { MouseEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { axios } from "@/lib/axios";

const Upvotebutton = ({ projectId: projectId }: { projectId: string }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const upvote = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHasUpvoted(!hasUpvoted);
    try {
      await axios.post(`/project/${projectId}/upvote`);
    } catch (error) {
      setHasUpvoted(false);
      console.log(error);
    }
  };

  useEffect(() => {
    axios(`/project/${projectId}/upvote`).then((data) => {
      setHasUpvoted(data.data.hasUpvoted);
    });
  }, []);

  return (
    <Button
      className={`w-full py-6 font-bold ${
        hasUpvoted
          ? "border-2 text-black border-black shadow-none bg-transparent hover:text-white hover:bg-black/80"
          : "border-transparent border-2"
      }`}
      onClick={upvote}
    >
      Upvote{hasUpvoted ? "d" : ""}
    </Button>
  );
};

export default Upvotebutton;
