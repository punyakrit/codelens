"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Brain, Rocket } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Github,
    title: "Connect GitHub",
    description: "Link your GitHub account and select repositories to enable AI-powered features",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    number: "2",
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI analyzes your codebase and provides intelligent insights and suggestions",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    number: "3",
    icon: Rocket,
    title: "Ship Faster",
    description: "Collaborate smarter, generate docs automatically, and deploy with confidence",
    color: "from-rose-500 to-rose-700",
    bgColor: "bg-rose-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <motion.div 
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
          How It Works
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-slate-600 px-4">
          Get started in minutes with our simple 3-step process
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="text-center group"
            variants={itemVariants}
          >
            <motion.div 
              className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor} group-hover:scale-110 transition-all duration-300 relative`}
              whileHover={{ rotate: 5 }}
            >
              <step.icon className="h-8 w-8 text-rose-600 absolute" />
              <motion.span 
                className="text-2xl font-bold text-rose-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }}
              >
                {step.number}
              </motion.span>
            </motion.div>
            <motion.h3 
              className="mb-4 text-xl font-semibold text-slate-900 group-hover:text-rose-600 transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.2 }}
            >
              {step.title}
            </motion.h3>
            <motion.p 
              className="text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.2 }}
            >
              {step.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
