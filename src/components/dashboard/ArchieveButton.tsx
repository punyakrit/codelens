"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import useRefresh from "@/hooks/use-refresh";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from "sonner";

function ArchieveButton() {
  const archiveProject = api.project.archiveProject.useMutation();  
  const { project } = useProject();
  const refetchProjects = useRefresh();
  const [open, setOpen] = useState(false);
  return (
    <>
    <Button 
      variant="destructive" 
      onClick={() => setOpen(true)}
      disabled={!project?.id || archiveProject.isPending}
      size="sm"
      className="text-xs sm:text-sm"
    >
      Archive
    </Button>
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
            <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg">Are you sure you want to archive this project?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm">This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  disabled={archiveProject.isPending}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => archiveProject.mutate({ projectId: project?.id! }, {
                    onSuccess: () => {
                      toast.success("Project archived successfully");
                      refetchProjects();
                      setOpen(false);
                    },
                    onError: (error) => {
                      toast.error(error.message);
                    }
                  })}
                  disabled={archiveProject.isPending}
                  className="w-full sm:w-auto"
                >
                  {archiveProject.isPending ? "Archiving..." : "Archive"}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}

export default ArchieveButton;
