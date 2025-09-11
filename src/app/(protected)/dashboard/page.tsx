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
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4 w-full">
        <div className="bg-primary flex w-fit items-center rounded-md px-4 py-3">
          <Github className="size-5 text-white" />
          <div className="ml-2">
            <p className="text-sm font-medium text-white">
              This project is linked to {" "}
              <Link
                href={project?.repoUrl || ""}
                target="_blank"
                className="inline-flex items-center text-white/80 hover:underline"
              >
                {project?.repoUrl}
                <ExternalLink className="ml-1 size-4 text-white/80" />
              </Link>
            </p>
          </div>
        </div>
        <div className="h-4">

        </div>
        <div className="flex items-center gap-x-4">
          <TeamMembers/>
          <InviteButton/>
        <ArchieveButton/> 
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <AskQuestion/>
          <PullRequestCard/>
        </div>
        
      </div>
      <div className="mt-8">
      <CommitLog/>
      </div>
    </div>
  );
}

export default Page;
