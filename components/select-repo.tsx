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
import { useUser } from "@/stores/useUser";
import axios from "axios";
import { useEffect, useState } from "react";

interface RepositoryProps {
  id: number;
  name: string;
  html_url: string;
  full_name: string;
  description: string;
  homepage: string;
}

export function SelectRepository({
  onSelectRepository,
}: {
  onSelectRepository: (repository: RepositoryProps) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryProps | null>();
  const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

  const username = "shadcn";
  useEffect(() => {
    async function fetchRepositories() {
      const { data } = await axios(
        `https://api.github.com/users/${username}/repos`
      );
      setRepositories(data);
    }
    fetchRepositories();
  }, []);

  return (
    <div className="flex items-center space-x-4 mt-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedRepo ? (
              <>{selectedRepo.full_name}</>
            ) : (
              <>+ Select repository</>
            )}
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
                    key={repository.id}
                    onSelect={() => {
                      onSelectRepository(repository);
                      setSelectedRepo(repository);
                      setOpen(false);
                    }}
                  >
                    {repository.full_name}
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
