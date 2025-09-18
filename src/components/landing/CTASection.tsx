"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 p-6 sm:p-8 lg:p-12 text-center text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-rose-600/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(244, 63, 94, 0.1), rgba(219, 39, 119, 0.1))",
              "linear-gradient(225deg, rgba(244, 63, 94, 0.1), rgba(219, 39, 119, 0.1))",
              "linear-gradient(45deg, rgba(244, 63, 94, 0.1), rgba(219, 39, 119, 0.1))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.h2 
          className="relative mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Development Workflow?
        </motion.h2>
        
        <motion.p 
          className="relative mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg lg:text-xl opacity-90 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Join thousands of developers who are already shipping code faster
          with AI-powered collaboration
        </motion.p>
        
        <motion.div 
          className="relative flex flex-col justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/create">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg bg-white text-rose-600 hover:bg-rose-50 hover:text-rose-700 shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
            >
              Get Started
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 h-16 w-16 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </section>
  );
}
