"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <motion.header 
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-rose-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">CodeLens</span>
        </motion.div>
            </Link>
         
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isSignedIn ? (
            <Link href="/create">
              <Button
                size="sm"
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
              >
                Create Project
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="text-slate-700 hover:text-rose-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
                >
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}
