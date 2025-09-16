"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Star, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
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
        className="mb-6 text-5xl leading-tight font-bold text-slate-900 md:text-6xl"
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
        className="mx-auto mb-8 max-w-3xl text-xl text-slate-600"
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
          className="bg-gradient-to-r from-rose-500 to-rose-600 px-8 py-6 text-lg hover:from-rose-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Link href="/sign-up" className="flex items-center">
            <Github className="mr-2 h-5 w-5" />
            Connect Account
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="px-8 py-6 text-lg border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-300"
        >
          Watch Demo
        </Button>
      </motion.div>

      <motion.div 
        className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="flex items-center">
          <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
          <span>4.9/5 from 2,000+ developers</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4" />
          <span>10,000+ active users</span>
        </div>
      </motion.div>
    </section>
  );
}
