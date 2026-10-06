'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const FreeGiftPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('free-gift-popup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setShowPopup(true), 1500);
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#19151D]/75 backdrop-blur-md font-serif select-none"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl w-full bg-[#FFFFFF] border border-[#D8CEDA] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 z-30 p-2 text-[#A58AB8] hover:text-[#21132F] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Left Side: Editorial Image */}
            <div className="relative w-full md:w-1/2 min-h-[240px] md:min-h-[380px] bg-[#21132F] overflow-hidden">
              <Image
                src="/moon_essence_2.jpg"
                alt="THE PERFUME ESSENCE Exclusive Moon Essence Gift"
                fill
                className="object-cover transition-transform duration-[3000ms] hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-[#21132F]/20" />
            </div>

            {/* Right Side: Editorial Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-8 md:p-12 bg-[#F7F2E8]">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8A45D] mb-3 font-normal">
                ATELIER INVITATION
              </span>

              <h2 className="text-2xl sm:text-3xl text-[#21132F] font-normal leading-tight mb-4">
                A Gift for The <br />
                <span className="italic font-normal text-[#68447F]">Connoisseur</span>
              </h2>

              <div className="w-10 h-px bg-[#C8A45D] mb-6" />

              <p className="text-[#6E6472] text-xs sm:text-sm font-normal leading-relaxed max-w-[280px] mb-8">
                Receive an exclusive handcrafted Moon Essence luxury gift with every order exceeding{' '}
                <strong className="text-[#21132F] font-semibold">₹5,000</strong>.
              </p>

              <button
                onClick={() => setShowPopup(false)}
                className="btn-luxury-primary w-full max-w-[240px]"
              >
                <span>Claim Invitation</span>
              </button>

              <p className="mt-4 text-[9px] uppercase tracking-[0.15em] text-[#68447F]">
                * Applied automatically at checkout
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FreeGiftPopup;