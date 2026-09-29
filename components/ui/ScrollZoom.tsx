"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollZoom({ children }: { children: React.ReactNode }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Starts when top of image hits bottom of screen
  });

  // Scale from 0.8 (smaller) to 1 (full size)
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  // Optional: Add a slight fade-in
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full bg-[#FCF9F6]">
      <motion.div style={{ scale, opacity }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}