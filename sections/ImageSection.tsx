'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const ImageSection = () => {
  return (
    <section className="relative w-full bg-[#18131D] py-16 md:py-24 px-4 sm:px-6 lg:px-10 border-b border-[#3B2450] font-serif">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full h-[55vh] sm:h-[70vh] md:h-[75vh] min-h-[440px] max-h-[720px] overflow-hidden bg-[#21152F] border border-[#C9A45C]/30 shadow-2xl group">
          
          <Image
            src="/moon_essence_3.jpg"
            alt="MOON ESSENCE luxury fragrance campaign"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-[2500ms] ease-out group-hover:scale-105"
          />

          {/* Deep Moonlit Purple Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#18131D]/95 via-[#21152F]/60 to-[#18131D]/40" />

          {/* Centered Editorial Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 sm:p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl space-y-4"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#C9A45C] font-normal block">
                MOON ESSENCE • HAUTE PARFUMERIE
              </span>
              
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F7F3EA] font-normal leading-tight tracking-tight">
                Crafted to Linger, <br />
                <span className="italic font-normal text-[#E9DCC8]">Designed to Enchant.</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#E9DCC8]/85 max-w-xl mx-auto font-normal leading-relaxed tracking-wide pt-2">
                Discover the harmony of nocturnal perfumery, fine jewelry, and luxury timepieces compounded for the discerning connoisseur.
              </p>

              <div className="pt-6">
                <Link
                  href="/collections/perfumes"
                  className="btn-luxury-primary !bg-[#21152F] !text-[#F7F3EA] !border-[#C9A45C] hover:!bg-[#C9A45C] hover:!text-[#18131D] hover:!border-[#C9A45C]"
                >
                  <span>Explore The Nocturne Atelier</span>
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImageSection;