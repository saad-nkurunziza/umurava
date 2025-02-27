"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
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
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { fetcher } from "@/utils/fetcher";
import { Skeleton } from "./ui/skeleton";
import { SearchType } from "@/utils/types";

interface SearchResponse {
  data?: SearchType[];
  error?: string;
}

const DEBOUNCE_DELAY = 300;
const SKELETON_COUNT = 4;

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, DEBOUNCE_DELAY);

  const {
    data: result,
    isLoading,
    error,
  } = useSWR<SearchResponse>(
    query ? `/api/search-challenges?q=${encodeURIComponent(query)}` : null,
    fetcher
  );

  const renderLoadingState = () => (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <Skeleton key={index} className="aspect-video h-10 w-full" />
      ))}
    </div>
  );

  const handleSelectChallenge = (challengeId: string) => {
    router.push(`/challenge/${challengeId}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SidebarMenuButton tooltip="Search Challenges">
          <Search />
          <span>Search</span>
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search challenges..."
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>No challenges found.</CommandEmpty>
            {(error || result?.error) && !isLoading && (
              <CommandItem disabled>Error fetching challenges.</CommandItem>
            )}
            {isLoading && !error && !result?.error && renderLoadingState()}
            {result?.data && (
              <CommandGroup heading="Challenges">
                {result.data.map((challenge) => (
                  <CommandItem
                    key={challenge.id}
                    className="flex flex-col items-start py-1 gap-0.5"
                    onSelect={() => handleSelectChallenge(challenge.id)}
                  >
                    <h5>{challenge.title}</h5>
                    <span className="text-muted-foreground">
                      {challenge._count.participants}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
