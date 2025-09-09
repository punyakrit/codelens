"use client";
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Code2, Copy, Check } from "lucide-react";
import { askQuestion } from "@/actions/question";
import { readStreamableValue } from "@ai-sdk/rsc";
import CodeReference from "./CodeReference";
import { api } from "@/trpc/react";
import { toast } from "sonner";
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
  const saveAnswer = api.project.saveAnswer.useMutation();

  const refetchQuestions = useRefresh()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    setLoading(true);
    setOutput(""); // Reset output
    setFilesRefered([]); // Reset files
    try {
      const { output, filesRefered } = await askQuestion(question, project.id);
      setOpen(true);

      setFilesRefered(filesRefered);
      for await (const text of readStreamableValue(output)) {
        if (text) {
          setOutput((prev) => prev + text);
        }
      }
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
      <style jsx>{`
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .markdown-content p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        .markdown-content code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .markdown-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
        }
        .markdown-content ul,
        .markdown-content ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .markdown-content li {
          margin-bottom: 0.25rem;
        }
        .markdown-content blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #6b7280;
        }
      `}</style>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[80vh] max-w-[95vw] flex-col sm:max-w-[90vw]">
          <DialogHeader>
            <div className="flex items-center gap-5">
              <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                CodeLens <Code2 />
              </DialogTitle>
              <Button disabled={saveAnswer.isPending} variant="outline" onClick={()=>{
                saveAnswer.mutate({
                  projectId: project?.id!,
                  question: question,
                  answer: output,
                  fileReference: filesRefered
                },{
                  onSuccess:()=>{
                    toast.success("Answer saved successfully");
                    refetchQuestions();
                  },
                  onError:(error)=>{
                    toast.error(error.message);
                  }
                })
              }}>
                Save Answer
              </Button>
            </div>
          </DialogHeader>
          <DialogDescription className="flex-1 space-y-4 overflow-scroll">
            <div className="min-h-[200px] flex-1 overflow-y-auto rounded-lg border bg-gray-50 p-4">
              <div className="markdown-content">
                <MDEditor.Markdown
                  source={output}
                  className="!bg-transparent !text-gray-900"
                  style={{
                    backgroundColor: "transparent",
                    color: "#111827",
                  }}
                />
              </div>
              <CodeReference fileReference={filesRefered} />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file contains authentication logic?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit" className="mt-4" disabled={loading}>
              Ask CodeLens
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AskQuestion;
