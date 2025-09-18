"use client";
import useProject from '@/hooks/use-project';
import { api } from '@/trpc/react';
import React from 'react';
import PRCard from '@/components/dashboard/PRCard';
import { Skeleton } from '@/components/ui/skeleton';
import { GitPullRequest } from 'lucide-react';

function page() {
  const { project } = useProject();
  const { data: prs, isLoading } = api.project.getPRs.useQuery({
    projectId: project?.id!,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <GitPullRequest className="h-5 w-5 sm:h-6 sm:w-6" />
          <h1 className="text-xl sm:text-2xl font-bold">Pull Requests</h1>
        </div>
        <div className="grid gap-3 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 sm:p-6">
              <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
              <Skeleton className="h-3 sm:h-4 w-full mb-2" />
              <Skeleton className="h-3 sm:h-4 w-2/3 mb-3 sm:mb-4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 rounded-full" />
                <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                <Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!prs || prs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-12">
        <div className="mb-4 p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-gray-800">
          <GitPullRequest className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">No Pull Requests</h3>
        <p className="text-xs sm:text-sm text-muted-foreground text-center px-4">
          No pull requests found for this project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <GitPullRequest className="h-5 w-5 sm:h-6 sm:w-6" />
        <h1 className="text-xl sm:text-2xl font-bold">Pull Requests</h1>
        <span className="text-xs sm:text-sm text-muted-foreground">({prs.length})</span>
      </div>
      
      <div className="grid gap-3 sm:gap-4">
        {prs.map((pr) => (
          <PRCard key={pr.id} pr={pr} />
        ))}
      </div>
    </div>
  );
}

export default page