"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-project";
import type { cn } from "@/lib/utils";
import {
  Code2,
  CreditCard,
  DnaIcon,
  LayoutDashboard,
  MenuSquare,
  MessageCircleQuestion,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const items = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Q&A",
    url: "/qa",
    icon: MessageCircleQuestion,
  },
  {
    label: "Pull Requests",
    url: "/pr",
    icon: MenuSquare,
  },
  {
    label: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const { projects, setSelectedProjectId, selectedProjectId, project } =
    useProject();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <Link href="/dashboard">
          {open ? (
            <div className="ml-2 flex cursor-pointer items-center gap-2 font-bold">
              CodeLens <Code2 />
            </div>
          ) : (
            <Code2 className="ml-1 size-6" />
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`${pathname === item.url ? "bg-sidebar-primary/30" : ""} hover:bg-sidebar-primary/10 flex list-none items-center`}
                  >
                    <item.icon className="text-primary" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <div
                      className="cursor-pointer"
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <div
                        className={`text-primary flex size-6 items-center justify-center rounded-sm border text-sm ${project.id === selectedProjectId ? "bg-sidebar-primary/30" : ""}`}
                      >
                        {project.name[0]}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Link href="/create">
                  {open ? (
                    <Button
                      size="sm"
                      className="text-primary mt-2 flex items-center gap-2"
                      variant="secondary"
                    >
                      <PlusIcon />
                      Create Project
                    </Button>
                  ) : (
                    <div className="mt-2 flex items-center p-2">
                      <PlusIcon />
                    </div>
                  )}
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
