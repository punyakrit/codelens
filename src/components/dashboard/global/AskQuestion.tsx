"use client";
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Code2 } from "lucide-react";
import { askQuestion } from "@/actions/question";
import { readStreamableValue } from "@ai-sdk/rsc";
import CodeReference from "./CodeReference";
import { api } from "@/trpc/react";
import useRefresh from "@/hooks/use-refresh";

function AskQuestion() {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filesRefered, setFilesRefered] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [output, setOutput] = useState<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const saveAnswer = api.project.saveAnswer.useMutation();

  const refetchQuestions = useRefresh()

  const handleAutoSave = async () => {
    if (hasUnsavedChanges && output && question && project?.id) {
      try {
        await saveAnswer.mutateAsync({
          projectId: project.id,
          question: question,
          answer: output,
          fileReference: filesRefered
        });
        refetchQuestions();
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }
  };

  const handleDialogClose = async (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      await handleAutoSave();
    }
    setOpen(open);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    setLoading(true);
    setOutput(""); // Reset output
    setFilesRefered([]); // Reset files
    setHasUnsavedChanges(false); // Reset unsaved changes
    try {
      const { output, filesRefered } = await askQuestion(question, project.id);
      setOpen(true);

      setFilesRefered(filesRefered);
      for await (const text of readStreamableValue(output)) {
        if (text) {
          setOutput((prev) => prev + text);
        }
      }
      setHasUnsavedChanges(true); // Mark as having unsaved changes
    } catch (error) {
      console.error("Error asking question:", error);
      setOutput(
        "Sorry, there was an error processing your question. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style jsx global>{`
        .markdown-content,
        .markdown-content *,
        .w-md-editor-text,
        .w-md-editor-text * {
          color: hsl(var(--foreground)) !important;
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .w-md-editor-text h1,
        .w-md-editor-text h2,
        .w-md-editor-text h3 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: hsl(var(--foreground)) !important;
        }
        .markdown-content p,
        .w-md-editor-text p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
          color: hsl(var(--foreground)) !important;
        }
        .markdown-content code,
        .w-md-editor-text code {
          background-color: hsl(var(--muted)) !important;
          color: hsl(var(--foreground)) !important;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .markdown-content pre,
        .w-md-editor-text pre {
          background-color: hsl(var(--muted)) !important;
          color: hsl(var(--foreground)) !important;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .markdown-content pre code,
        .w-md-editor-text pre code {
          background-color: transparent !important;
          padding: 0;
          color: hsl(var(--foreground)) !important;
        }
        .markdown-content ul,
        .markdown-content ol,
        .w-md-editor-text ul,
        .w-md-editor-text ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          color: hsl(var(--foreground)) !important;
        }
        .markdown-content li,
        .w-md-editor-text li {
          margin-bottom: 0.25rem;
          color: hsl(var(--foreground)) !important;
        }
        .markdown-content blockquote,
        .w-md-editor-text blockquote {
          border-left: 4px solid hsl(var(--border)) !important;
          padding-left: 1rem;
          margin: 1rem 0;
          color: hsl(var(--muted-foreground)) !important;
        }
        .code-highlight {
          color: white;
          
        }
        .copied {
          color: hsl(var(--foreground)) !important;
        }
      `}</style>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="flex h-[85vh] sm:h-[80vh] max-w-[98vw] sm:max-w-[95vw] lg:max-w-[90vw] flex-col">
          <DialogHeader>
            <div className="flex items-center gap-5">
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-bold">
                CodeLens <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </DialogTitle>
            
            </div>
          </DialogHeader>
          <DialogDescription className="flex-1 space-y-4 overflow-scroll">
            <div className="min-h-[150px] sm:min-h-[200px] flex-1 overflow-y-auto rounded-lg border bg-background p-2 sm:p-4">
              <div className="markdown-content">
                <MDEditor.Markdown
                  source={output}
                  className="!bg-transparent"
                />
              </div>
              <CodeReference fileReference={filesRefered} />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                onClick={() => handleDialogClose(false)}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Card className="relative col-span-1 lg:col-span-3">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Ask a question</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
            <Textarea
              placeholder="Which file contains authentication logic?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
            />
            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
              Ask CodeLens
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AskQuestion;
