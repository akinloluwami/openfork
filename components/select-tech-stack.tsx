"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { techStack } from "@/lib/tech-stack";
import { Button } from "./ui/button";

function SelectTechStack({
  onSelectStack,
}: {
  onSelectStack: (stack: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">+ Select stack</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {techStack?.map((stack) => (
                  <CommandItem
                    key={stack.name}
                    onSelect={() => {
                      setOpen(false);
                      onSelectStack(stack.name);
                    }}
                  >
                    {stack.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SelectTechStack;
