"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {solarizedDarkAtom} from "react-syntax-highlighter/dist/esm/styles/prism";
type FileReference = {
  fileName: string;
  sourceCode: string;
  summary: string;
}[];

function CodeReference({ fileReference }: { fileReference: FileReference }) {
  const [tab, setTab] = useState(fileReference?.[0]?.fileName ?? "");
  if (fileReference.length === 0) return null;
  return (
    <div className="w-full">
      <h4 className="font-semibold mb-3 text-gray-900">Referenced Files:</h4>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 h-auto p-1 bg-gray-100">
          {fileReference.map((file) => (
            <TabsTrigger
              key={file.fileName}
              value={file.fileName}
              className="text-xs px-2 py-1.5 h-auto whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {file.fileName}
            </TabsTrigger>
          ))}
        </TabsList>
        {fileReference.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="mt-4 max-h-[60vh] overflow-y-auto rounded-md border"
          >
            <div className="p-2">
              <h5 className="font-medium text-sm text-gray-900 mb-2">{file.fileName}</h5>
              <p className="text-xs text-gray-600 mb-3">{file.summary}</p>
            </div>
            <SyntaxHighlighter 
              style={solarizedDarkAtom}
              className="!m-0 !rounded-none"
              showLineNumbers
              wrapLines
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CodeReference;
