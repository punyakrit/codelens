"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  MessageSquare,
  FileText,
  Users,
  Zap,
  Github,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Natural Language Code Search",
    description: "Search your entire codebase using natural language queries. Find functions, classes, and implementations instantly.",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    icon: MessageSquare,
    title: "AI Code Chat",
    description: "Chat with your codebase. Ask questions, get explanations, and receive suggestions for improvements.",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: FileText,
    title: "Auto-Generated Documentation",
    description: "Automatically generate comprehensive documentation for your code, APIs, and project structure.",
    color: "from-rose-500 to-rose-700",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-700",
  },
  {
    icon: Users,
    title: "Smart Pull Request Assistant",
    description: "AI-powered code review suggestions, conflict resolution, and automated testing recommendations.",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automate repetitive tasks, generate boilerplate code, and streamline your development process.",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    icon: Github,
    title: "Seamless GitHub Integration",
    description: "Direct integration with GitHub repositories, commits, and pull requests. No context switching required.",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <motion.div 
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
          Everything You Need to Code Smarter
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-slate-600 px-4">
          AI-powered features that integrate seamlessly with your existing
          GitHub workflow
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="group border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <motion.div 
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </motion.div>
                <CardTitle className="text-slate-900 group-hover:text-rose-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
