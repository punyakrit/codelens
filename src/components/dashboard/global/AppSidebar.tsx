"use client";
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
} from "@/components/ui/sidebar";
import type { cn } from "@/lib/utils";
import {
  Code2,
  CreditCard,
  DnaIcon,
  LayoutDashboard,
  MenuSquare,
  MessageCircleQuestion,
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
    label: "Meetings",
    url: "/meetings",
    icon: MenuSquare,
  },
  {
    label: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="ml-2 flex items-center gap-2 font-bold">
          CodeLens <Code2 />
        </div>
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
                    className={`${pathname === item.url ? "bg-sidebar-accent" : ""} list-none`}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
