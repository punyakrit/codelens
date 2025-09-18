"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Star, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Badge className="mb-6 bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200">
          <Github className="mr-2 h-4 w-4" />
          GitHub Integration
        </Badge>
      </motion.div>

      <motion.h1 
        className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-slate-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Ship Code Faster with
        <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
          {" "}
          AI-Powered
        </span>
        <br />
        GitHub Collaboration
      </motion.h1>

      <motion.p 
        className="mx-auto mb-8 max-w-3xl text-base sm:text-lg lg:text-xl text-slate-600 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Transform your development workflow with AI-assisted code navigation,
        auto-generated documentation, and intelligent pull-request assistance.
        Connect your GitHub repos and start collaborating smarter.
      </motion.p>

      <motion.div 
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-rose-500 to-rose-600 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:from-rose-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
        >
          <Link href="/sign-up" className="flex items-center justify-center w-full">
            <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Connect Account</span>
            <span className="sm:hidden">Connect</span>
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Watch Demo</span>
          <span className="sm:hidden">Demo</span>
        </Button>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-slate-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="flex items-center">
          <Star className="mr-1 h-3 w-3 sm:h-4 sm:w-4 fill-current text-yellow-500" />
          <span>4.9/5 from 2,000+ developers</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span>10,000+ active users</span>
        </div>
      </motion.div>
    </section>
  );
}
