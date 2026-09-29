'use client';

import { lavish } from '@/lib/fonts';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FreeGiftPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('free-gift-popup');
    if (!hasSeenPopup) {
      // Small delay to let the page load before showing luxury
      const timer = setTimeout(() => setShowPopup(true), 1000);
      sessionStorage.setItem('free-gift-popup', 'true');
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative max-w-4xl w-full aspect-[16/10] md:aspect-[16/8] bg-white rounded-sm overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col h-full md:h-fit md:flex-row"
          >
            {/* Close Button - Minimalist */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-5 right-5 z-30 text-zinc-400 hover:text-zinc-900 transition-colors"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Left Side: Image  ry */}
            <div className="relative w-full md:w-1/2 h-full bg-stone-100 overflow-hidden">
              <Image
                src="/gift.jpg"
                alt="THE PERFUME ESSENCE Exclusive Gift"
                fill
                className="object-cover transition-transform duration-[3000ms] hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center p-10 md:p-14 bg-white">
              <span className="text-[10px] uppercase tracking-[0.5em] text-amber-800 mb-6 font-bold">
                Limited Celebration
              </span>
              
              <h2 className={`${lavish.className} text-4xl lg:text-6xl text-zinc-900 leading-tight mb-6`}>
                A Gift for <br /> The Connoisseur
              </h2>
              
              <div className="w-12 h-px bg-stone-300 mb-8" />
              
              <p className="text-stone-500 text-sm md:text-base font-light leading-relaxed max-w-[350px] mb-10">
                Receive an exclusive handcrafted accessory with your order above 
                <span className="text-zinc-900 font-medium ml-1">INR 5,000</span>.
              </p>

              <button 
                onClick={() => setShowPopup(false)}
                className="group relative overflow-hidden bg-zinc-900 text-white px-10 py-5 text-[10px] uppercase tracking-[0.3em] flex items-center justify-center transition-all hover:bg-zinc-800"
              >
                <span className="relative z-10">Claim My Offer</span>
                <div className="absolute inset-0 bg-amber-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <p className="mt-6 text-[9px] uppercase tracking-[0.1em] text-stone-400">
                * Offer applied automatically at checkout
              </p>  
            </div>

            {/* Subtle Inner Border for "Luxury Print" feel */}
            <div className="absolute inset-4 border border-stone-100 pointer-events-none hidden md:block" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FreeGiftPopup;