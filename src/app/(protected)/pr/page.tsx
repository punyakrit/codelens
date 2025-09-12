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
        <div className="flex items-center gap-2 mb-6">
          <GitPullRequest className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Pull Requests</h1>
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!prs || prs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800">
          <GitPullRequest className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Pull Requests</h3>
        <p className="text-sm text-muted-foreground text-center">
          No pull requests found for this project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <GitPullRequest className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Pull Requests</h1>
        <span className="text-sm text-muted-foreground">({prs.length})</span>
      </div>
      
      <div className="grid gap-4">
        {prs.map((pr) => (
          <PRCard key={pr.id} pr={pr} />
        ))}
      </div>
    </div>
  );
}

export default page