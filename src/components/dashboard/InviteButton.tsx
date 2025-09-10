"use client";
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";

function InviteButton() {
  const { selectedProjectId } = useProject();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <p className="text-sm text-gray-500">
              Ask them to copy and paste this link into their browser to join
              the project.
            </p>
            <Input
              className="mt-4"
              readOnly
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/join/${selectedProjectId}`,
                );
                toast.success("Copied to clipboard");
              }}
              value={`${window.location.origin}/join/${selectedProjectId}`}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpen(true)} variant="outline">
        Invite Members
      </Button>
    </>
  );
}

export default InviteButton;
