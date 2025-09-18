"use client";
import React from "react";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      className="bg-slate-900 py-6 sm:py-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-rose-600">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold">CodeLens</span>
          </motion.div>
          
          <motion.p 
            className="text-sm text-slate-400 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            &copy; 2025 CodeLens. All rights reserved.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
