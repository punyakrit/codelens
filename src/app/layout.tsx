import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/Ui";

export const metadata: Metadata = {
  title: "CodeLens - AI-Powered GitHub Code Analysis & Collaboration",
  description: "Transform your development workflow with AI-assisted code navigation, natural language search, auto-generated documentation, and intelligent pull-request assistance. Connect your GitHub repos and start collaborating smarter with vector embeddings and machine learning.",
  keywords: [
    "AI code analysis",
    "GitHub integration", 
    "code search",
    "natural language programming",
    "vector embeddings",
    "code documentation",
    "pull request assistant",
    "code collaboration",
    "machine learning",
    "developer tools",
    "code intelligence",
    "AI programming assistant",
    "codebase analysis",
    "automated documentation",
    "code review AI",
    "GitHub automation",
    "developer productivity",
    "code understanding",
    "semantic search",
    "AI-powered development"
  ],
  authors: [{ name: "CodeLens Team" }],
  creator: "CodeLens",
  publisher: "CodeLens",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "CodeLens - AI-Powered GitHub Code Analysis & Collaboration",
    description: "Transform your development workflow with AI-assisted code navigation, natural language search, and intelligent collaboration tools.",
    siteName: "CodeLens",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLens - AI-Powered GitHub Code Analysis",
    description: "Ship code faster with AI-powered GitHub collaboration and code intelligence.",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider  appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}>

    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen">
      <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
      <TRPCReactProvider>
        {children}
        <Toaster richColors />
        </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
