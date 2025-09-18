"use client";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

function CommitLog() {
  const { selectedProjectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({
    projectId: selectedProjectId,
  });
  return (
    <>
      <ul className="space-y-4 sm:space-y-6">
        {commits?.map((commit, index) => {
          return (
            <li key={index} className="relative flex gap-x-3 sm:gap-x-4">
              <div
                className={`${commits.length - 1 === index ? `h-6` : `-bottom-6`} absolute top-0 left-0 flex w-6 justify-center`}
              >
                <div className="w-px translate-x-1 bg-gray-200"></div>
              </div>
              <>
                <img
                  src={commit.commitAuthorAvatarUrl}
                  alt={commit.commitAuthorName}
                  className="z-10 mt-3 sm:mt-4 size-6 sm:size-8 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto rounded-md bg-white p-2 sm:p-3 ring-1 ring-gray-200 ring-inset">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-x-4">
                    <Link
                      href={`${project?.repoUrl}/commit/${commit.commitHash}`}
                      target="_blank"
                      className="py-0.5 text-xs leading-5 text-gray-500"
                    >
                      <span className="font-medium text-gray-900">
                        {commit.commitAuthorName}
                      </span>{" "}
                      <span className="inline-flex items-center">
                        commited
                        <ExternalLink className="ml-1 size-3 sm:size-4 text-gray-500" />
                      </span>
                    </Link>
                  </div>
                <span className="font-semibold text-sm sm:text-base block mt-1">
                  {commit.commitMessage}
                </span>
                <pre className="mt-1 text-xs sm:text-sm whitespace-pre-wrap text-gray-500 leading-5 sm:leading-6 overflow-x-auto">
                  {commit.summary}
                </pre>
                </div>
              </>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CommitLog;
