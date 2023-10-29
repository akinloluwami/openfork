"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { axios } from "@/lib/axios";

const Upvotebutton = ({ id }: { id: string }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    axios(`/project/${id}/upvote`).then((data) => {
      setHasUpvoted(data.data.hasUpvoted);
    });
  }, []);

  return <Button className="w-[250px] py-6"> Upvote</Button>;
};

export default Upvotebutton;
