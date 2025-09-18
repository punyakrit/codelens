"use client";
import ArchieveButton from "@/components/dashboard/ArchieveButton";
import CommitLog from "@/components/dashboard/CommitLog";
import InviteButton from "@/components/dashboard/InviteButton";
import PullRequestCard from "@/components/dashboard/PullRequestCard";
import TeamMembers from "@/components/dashboard/TeamMembers";
import AskQuestion from "@/components/dashboard/global/AskQuestion";
import useProject from "@/hooks/use-project";
import { useUser } from "@clerk/nextjs";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function Page() {
  const { project } = useProject();


  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div className="bg-primary flex w-full sm:w-fit items-center rounded-md px-3 sm:px-4 py-2 sm:py-3">
          <Github className="size-4 sm:size-5 text-white flex-shrink-0" />
          <div className="ml-2 min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-white truncate">
              This project is linked to {" "}
              <Link
                href={project?.repoUrl || ""}
                target="_blank"
                className="inline-flex items-center text-white/80 hover:underline"
              >
                <span className="truncate">{project?.repoUrl}</span>
                <ExternalLink className="ml-1 size-3 sm:size-4 text-white/80 flex-shrink-0" />
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <TeamMembers/>
          <InviteButton/>
          <ArchieveButton/> 
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <AskQuestion/>
          <PullRequestCard/>
        </div>
        
      </div>
      <div className="mt-6 sm:mt-8">
      <CommitLog/>
      </div>
    </div>
  );
}

export default Page;
