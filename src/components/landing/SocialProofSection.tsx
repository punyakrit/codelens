"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer @ TechCorp",
    content: "CodeLens has cut our code review time in half. The AI suggestions are incredibly accurate and the documentation generation is a game-changer.",
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Engineer @ StartupXYZ",
    content: "The natural language search feature alone has saved me hours of digging through legacy code. It's like having a senior developer on call 24/7.",
    avatar: "MR",
  },
  {
    name: "Alex Thompson",
    role: "DevOps Engineer @ CloudScale",
    content: "Seamless GitHub integration means no context switching. Our team productivity has increased by 40% since we started using CodeLens.",
    avatar: "AT",
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

export default function SocialProofSection() {
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
          Trusted by Developers Worldwide
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-slate-600 px-4">
          Join thousands of developers who've transformed their workflow
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="group border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 + i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
