"use client";
import useProject from "@/hooks/use-project";
import React, { useState, useEffect } from "react";
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
  const [inviteUrl, setInviteUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInviteUrl(`${window.location.origin}/join/${selectedProjectId}`);
    }
  }, [selectedProjectId]);

  const handleCopyToClipboard = () => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(inviteUrl);
      toast.success("Copied to clipboard");
    }
  };

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
              onClick={handleCopyToClipboard}
              value={inviteUrl}
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
