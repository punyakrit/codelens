"use client";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function TeamMembers() {
  const { selectedProjectId } = useProject();
  const { data: teamMembers } = api.project.getTeamMembers.useQuery({
    projectId: selectedProjectId,
  });
  return <  div className=" flex items-center gap-2">
    {teamMembers?.map((member) => (
      <div key={member.id} className="flex items-center gap-x-2">
        <Avatar>
          <AvatarImage src={member.user.imageUrl ?? ""} />
          <AvatarFallback>{member.user.firstName?.charAt(0) ?? ""}</AvatarFallback>
        </Avatar>
      </div>
    ))} 
  </div>;
}

export default TeamMembers;
