"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";
type FileReference = {
  fileName: string;
  sourceCode: string;
  summary: string;
}[];

function CodeReference({ fileReference }: { fileReference: FileReference }) {
  const [tab, setTab] = useState(fileReference?.[0]?.fileName ?? "");
  if (fileReference.length === 0) return null;
  return (
    <div className="max-w-full mt-10">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex gap-2 overflow-scroll rounded-md bg-gray-200 p-1">
          {fileReference.map((file) => (
            <button
              onClick={() => setTab(file.fileName)}
              key={file.fileName}
              className={`rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${tab === file.fileName ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"} `}
              value={file.fileName}
            >
              {file.fileName}
            </button>
          ))}
        </div>
        {fileReference.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="max-h-[50vh] max-w-full overflow-scroll rounded-md"
          >
            <SyntaxHighlighter style={materialDark}>
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CodeReference;
