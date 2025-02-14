"use client";

import { Folder, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { UserChallengeExtendedProps } from "@/utils/types";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ChallengeResponse {
  data?: UserChallengeExtendedProps[];
  error?: string;
}

export function NavChallenges() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data: result, isLoading } = useSWR<ChallengeResponse>(
    "/api/challenges",
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="aspect-video h-8 w-full" />
        ))}
      </div>
    );

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Challenges</SidebarGroupLabel>
      <SidebarMenu>
        {result &&
          result.data &&
          result.data.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link href={`/challenge/${item.challenge.id}`}>
                  <span className="line-clamp-1">{item.challenge.title}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/challenge/submit-challenge/${item.challenge.id}`
                      )
                    }
                  >
                    <Folder className="text-muted-foreground" />
                    <span>Submit Challenge</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <Trash2 className="text-muted-foreground" />
                    <span>Leave Challenge</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => router.push("/challenges")}>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
