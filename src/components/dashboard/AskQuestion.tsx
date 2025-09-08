"use client";
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Code2 } from "lucide-react";
import { askQuestion } from "@/actions/question";
import { readStreamableValue } from "@ai-sdk/rsc";

function AskQuestion() {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filesRefered, setFilesRefered] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [output, setOutput] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    setLoading(true);
    setOutput(""); // Reset output
    setFilesRefered([]); // Reset files
    try {
      const { output, filesRefered } = await askQuestion(question, project.id);
      setFilesRefered(filesRefered);
      for await (const text of readStreamableValue(output)) {
        if (text) {
          setOutput((prev) => prev + text);
        }
      }
    } catch (error) {
      console.error("Error asking question:", error);
      setOutput("Sorry, there was an error processing your question. Please try again.");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
              CodeLens <Code2 />
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {output}
            {filesRefered.map((file) => (
              <div key={file.fileName}>
                <h3>{file.fileName}</h3>
                <p>{file.summary}</p>
              </div>
            ))}
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
            <Button type="submit" className="mt-4">
              Ask CodeLens
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AskQuestion;
