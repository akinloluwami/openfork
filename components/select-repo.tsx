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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [repos, setRepos] = useState<
    {
      org: string;
      repos: RepositoryProps[];
    }[]
  >([
    {
      org: "shadcn",
      repos: [
        {
          id: 1,
          name: "shadcn/shadcn.github.io",
          html_url: "https://github.com/shadcn/shadcn.github.io",
          full_name: "shadcn/shadcn.github.io",
          description: "shadcn's blog",
          homepage: "https://shadcn.github.io",
        },
        {
          id: 2,
          name: "shadcn/shadcn.github.io-blog",
          html_url: "https://github.com/shadcn/shadcn.github.io-blog",
          full_name: "shadcn/shadcn.github.io-blog",
          description: "shadcn's blog",
          homepage: "https://shadcn.github.io/blog",
        },
      ],
    },
    {
      org: "something",
      repos: [
        {
          id: 3,
          name: "shadcn/shadcn.github.io-blog",
          html_url: "https://github.com/shadcn/shadcn.github.io-blog",
          full_name: "shadcn/shadcn.github.io-blog",
          description: "shadcn's blog",
          homepage: "https://shadcn.github.io/blog",
        },
        {
          id: 3,
          name: "shadcn/something.io-blog",
          html_url: "https://github.com/shadcn/shadcn.github.io-blog",
          full_name: "shadcn/shadcn.github.io-blog",
          description: "shadcn's blog",
          homepage: "https://shadcn.github.io/blog",
        },
      ],
    },
  ]);

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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

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
