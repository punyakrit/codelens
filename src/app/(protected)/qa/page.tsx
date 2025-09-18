"use client";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AskQuestion from "@/components/dashboard/global/AskQuestion";
import MDEditor from "@uiw/react-md-editor";
import CodeReference from "@/components/dashboard/global/CodeReference";

function page() {
  const { project } = useProject();
  const [open, setOpen] = useState(false);
  const { data: questions } = api.project.getQuestions.useQuery({
    projectId: project?.id!,
  });
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <AskQuestion />
      <div className="h-4"></div>
      <h1 className="text-lg sm:text-xl font-semibold">Saved Questions</h1>
      <div className="mt-2 flex flex-col gap-2">
        {questions?.map((question, index) => (
          <div key={question.id} className="flex flex-col gap-2">
            <SheetTrigger onClick={() => setQuestionIndex(index)}>
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 rounded-lg border bg-white p-3 sm:p-4 shadow">
                <img
                  className="rounded-full flex-shrink-0"
                  height={24}
                  width={24}
                  src={question.user.imageUrl || ""}
                />
                <div className="flex flex-col text-left min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <p className="line-clamp-2 sm:line-clamp-1 text-sm sm:text-lg font-medium text-gray-700">
                      {question.question}
                    </p>
                    <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                      {question.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs sm:text-sm text-gray-500 mt-1">
                    {question.answer}
                  </p>
                </div>
              </div>
            </SheetTrigger>
          </div>
        ))}
      </div>
      {question && (
        <SheetContent className="min-w-[95vw] sm:min-w-[80vw]">
          <SheetHeader>
            <SheetTitle className="text-base sm:text-lg">{question.question}</SheetTitle>
          </SheetHeader>
          <SheetDescription className="p-2 sm:p-4 overflow-y-scroll">
            <MDEditor.Markdown
              source={question.answer}
              className="!bg-transparent !text-gray-900"
              style={{
                backgroundColor: "transparent",
                color: "#111827",
              }}
            />
            <CodeReference fileReference={(question.fileReference ?? []) as any} />
          </SheetDescription>
        </SheetContent>
      )}
    </Sheet>
  );
}

export default page;
