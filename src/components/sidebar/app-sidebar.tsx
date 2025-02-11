"use client";

import * as React from "react";
import {
  BookOpen,
  Command,
  HelpCircle,
  LayoutDashboard,
  // LifeBuoy,
  MessageCircle,
  // Send,
  Target,
  // Users,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavChallenges } from "@/components/sidebar/nav-challenges";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Challenges",
      url: "/challenges",
      icon: BookOpen,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Target,
    },
    // {
    //   title: "Community",
    //   url: "/community",
    //   icon: Users,
    // }
  ],
  navSecondary: [
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageCircle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Umurava</span>
                  <span className="truncate text-xs">Learn by Doing</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavChallenges />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
