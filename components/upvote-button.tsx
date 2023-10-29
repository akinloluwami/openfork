"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { axios } from "@/lib/axios";

const Upvotebutton = ({ id }: { id: string }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const upvote = async () => {
    setHasUpvoted(!hasUpvoted);
    try {
      await axios.post(`/project/${id}/upvote`);
    } catch (error) {
      setHasUpvoted(false);
    }
  };

  useEffect(() => {
    axios(`/project/${id}/upvote`).then((data) => {
      setHasUpvoted(data.data.hasUpvoted);
    });
  }, []);

  return (
    <Button
      className={`w-[250px] py-6 mt-5 font-bold ${
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
