"use client";

import { CalendarRange, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { SearchDialog } from "@/components/search-dialog";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  const isSubmitPath =
    pathname === "submissions" || pathname.includes("submissions");
  const { data: session } = useSession();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SearchDialog />
        </SidebarMenuItem>
        {items.map((item) => {
          const isActive = pathname === item.url || pathname.includes(item.url);
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  isActive && "bg-primary/55 text-primary-foreground"
                )}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        {session?.user.role === "ADMIN" ? (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={"Submissions"}
              className={cn(
                isSubmitPath && "bg-primary/55 text-primary-foreground"
              )}
            >
              <Link href={"/submissions"}>
                <CalendarRange />
                <span>Submissions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null}
      </SidebarMenu>
    </SidebarGroup>
  );
}
