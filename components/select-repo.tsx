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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axios } from "@/lib/axios";

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
  const [selectedOrg, setSelectedOrg] = useState<string | null>("shadcn");

  const [repos, setRepos] = useState<
    {
      org: string;
      repos: RepositoryProps[];
    }[]
  >([]);

  const username = "shadcn";
  useEffect(() => {
    async function fetchRepositories() {
      const { data } = await axios("/user/repos");
      setRepos(data);
      setSelectedOrg(data[0]?.org);
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
        <PopoverContent
          className="p-1 flex w-[500px] gap-2"
          side="right"
          align="start"
        >
          <Select
            onValueChange={(org) => {
              setSelectedOrg(org);
            }}
          >
            <SelectTrigger className="w-[250px] mt-1">
              <SelectValue placeholder={repos[0]?.org} />
            </SelectTrigger>
            <SelectContent>
              {repos.map((repo) => (
                <SelectItem key={repo.org} value={repo.org}>
                  {repo.org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Command>
            <CommandInput placeholder="Search repos..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {repos
                  .find((repo) => repo.org === selectedOrg)
                  ?.repos.map((repository) => (
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
