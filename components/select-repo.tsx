"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function SelectRepository({
  onSelectRepository,
  repositories,
}: {
  onSelectRepository: (repository: string) => void;
  repositories: string[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>();

  return (
    <div className="flex items-center space-x-4 mt-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedRepo ? <>{selectedRepo}</> : <>+ Select repository</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search repos..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {repositories.map((repository) => (
                  <CommandItem
                    key={repository}
                    onSelect={() => {
                      onSelectRepository(repository);
                      setSelectedRepo(repository);
                      setOpen(false);
                    }}
                  >
                    {repository}
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
