"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
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
  const createProject = api.project.createProject.useMutation();


  function onSubmit(data: formInputs) {
    createProject.mutate({
      name: data.projectName,
      repoUrl: data.repoUrl,
      githubToken: data.githubToken,
    },{
      onSuccess: () => {
        toast.success("Project created successfully");
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

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
            <div className="flex flex-col gap-1">
              <Label>Github Token</Label>
              <Input
                {...register("githubToken")}
                placeholder="Github Token (optional)"
              />
            </div>
            <Button type="submit" className="mt-2" disabled={createProject.isPending}>
              Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
