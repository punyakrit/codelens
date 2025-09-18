import AppSidebar from "@/components/dashboard/global/AppSidebar";
import SearchBar from "@/components/dashboard/global/SearchBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="m-1 sm:m-2 w-full">
          <div className="border-sidebar-border bg-sidebar flex flex-col sm:flex-row items-center gap-2 rounded-md border p-2 sm:px-4 shadow">
            <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1">
              <SidebarTrigger className="md:hidden h-8 w-8" />
              <div className="flex-1 sm:flex-none">
                <SearchBar/>
              </div>
            </div>
            <div className="ml-auto">
              <UserButton />
            </div>
          </div>
          <div className="h-2 sm:h-4"></div>

          <div className="border-sidebar-border bg-sidebar h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-scroll rounded-md border p-2 sm:p-4 shadow">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default layout;
