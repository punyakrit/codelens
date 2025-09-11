"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRefresh from "@/hooks/use-refresh";
import { api } from "@/trpc/react";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface formInputs {
  projectName: string;
  repoUrl: string;
  githubToken?: string;
}

function page() {
  const { register, handleSubmit, reset } = useForm<formInputs>();
  const checkCredits = api.project.checkCredits.useMutation();
  const createProject = api.project.createProject.useMutation();
  const refresh = useRefresh();
  const router = useRouter();
  function onSubmit(data: formInputs) {
    if (!checkCredits.data) {
      checkCredits.mutate(
        {
          githubUrl: data.repoUrl,
          githubToken: data.githubToken,
        },
        {
          onSuccess: (creditData) => {
            if (creditData.userCredits < creditData.fileCount) {
              toast.error("Insufficient credits. Please purchase more credits to continue.");
              return;
            }
          },
          onError: (error) => {
            toast.error(`Failed to check credits: ${error.message}`);
          },
        }
      );
    } else {
      createProject.mutate(
        {
          name: data.projectName,
          repoUrl: data.repoUrl,
          githubToken: data.githubToken,
        },
        {
          onSuccess: () => {
            toast.success("Project created successfully");
            refresh();
            reset();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  }

  function handleCreateProject(data: formInputs) {
    createProject.mutate(
      {
        name: data.projectName,
        repoUrl: data.repoUrl,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          refresh();
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }

  const hasEnoughCredits = checkCredits.data?.userCredits ? checkCredits.data?.fileCount <= checkCredits.data?.userCredits : true;


  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/create-img.png" alt="create" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of your Github repository to link it to CodeLens
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <Label>Project Name</Label>
              <Input
                {...register("projectName")}
                placeholder="Project Name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Repository URL</Label>
              <Input
                {...register("repoUrl")}
                placeholder="Repository URL"
                required
              />
            </div>
            
            {!!checkCredits.data && (
              <div className={`mt-2 rounded-md border px-4 py-2 ${
                hasEnoughCredits 
                  ? "border-green-200 bg-green-50 text-green-600" 
                  : "border-rose-200 bg-rose-50 text-rose-600"
              }`}>
                <div className="flex items-center gap-2">
                  <Info className="size-4" />
                  <p className="text-sm">
                    You will be charged {checkCredits.data?.fileCount} credits for this repository.
                  </p>
                </div>
                <p className="text-sm">
                  You have <strong>{checkCredits.data?.userCredits}</strong> credits remaining.
                </p>
                {!hasEnoughCredits && (
                  <p className="text-sm font-medium mt-1">
                    Insufficient credits! You need {checkCredits.data?.fileCount - checkCredits.data?.userCredits} more credits.
                  </p>
                )}
              </div>
            )}
            {!checkCredits.data || checkCredits.isPending ? (
              <Button
                type="submit"
                className="mt-2"
                disabled={checkCredits.isPending}
              >
                {checkCredits.isPending ? "Checking Credits..." : "Check Credits"}
              </Button>
            ) : !hasEnoughCredits ? (
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/billing')}
                >
                  Purchase Credits
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                className="mt-2"
                disabled={createProject.isPending}
                onClick={handleSubmit(handleCreateProject)}
              >
                {createProject.isPending ? "Creating Project..." : "Create Project"}
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
