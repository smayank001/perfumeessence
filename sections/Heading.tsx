'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const Heading = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // return (
  //   <section className="relative w-full bg-[#EFE7DA] py-16 md:py-24 px-4 sm:px-6 lg:px-10 border-b border-[#D8CEDA] font-serif overflow-hidden select-none">
  //     <div className="max-w-5xl mx-auto text-center">

  //       {/* Subtle Brand Ribbon */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 10 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         className="inline-flex items-center gap-3 mb-6"
  //       >
  //         <span className="h-px w-10 bg-[#C8A45D]" />
  //         <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#68447F] font-normal">
  //           OUR PHILOSOPHY OF MOONLIT LUXURY
  //         </span>
  //         <span className="h-px w-10 bg-[#C8A45D]" />
  //       </motion.div>

  //       {/* Editorial Statement */}
  //       <motion.div
  //         variants={containerVariants}
  //         initial="hidden"
  //         whileInView="visible"
  //         viewport={{ once: true, amount: 0.3 }}
  //         className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.35] sm:leading-[1.4] text-[#21132F] font-normal tracking-wide"
  //       >
  //         <motion.p variants={itemVariants} className="inline">
  //           <span className="font-normal text-[#21132F]">THE PERFUME ESSENCE</span> captures the mystery of the moonlight with{' '}
  //         </motion.p>

  //         {/* Inline Image Medallion 1 */}
  //         <motion.span variants={itemVariants} className="inline-block align-middle mx-2 my-1">
  //           <span className="relative inline-block w-[75px] h-[36px] sm:w-[95px] sm:h-[44px] rounded-full overflow-hidden border border-[#C8A45D]/60 shadow-sm align-middle">
  //             <Image
  //               src="/moon_essence_2.jpg"
  //               alt="Moon Essence Fragrance flacon"
  //               fill
  //               className="object-cover hover:scale-110 transition-transform duration-500"
  //             />
  //           </span>
  //         </motion.span>

  //         <motion.p variants={itemVariants} className="inline italic text-[#68447F]">
  //           haute parfumerie,{' '}
  //         </motion.p>

  //         <motion.p variants={itemVariants} className="inline">
  //           rare botanical extraits,{' '}
  //         </motion.p>

  //         {/* Inline Image Medallion 2 */}
  //         <motion.span variants={itemVariants} className="inline-block align-middle mx-2 my-1">
  //           <span className="relative inline-block w-[75px] h-[36px] sm:w-[95px] sm:h-[44px] rounded-full overflow-hidden border border-[#C8A45D]/60 shadow-sm align-middle">
  //             <Image
  //               src="/moon_essence_3.jpg"
  //               alt="Signature Flacon and Raw Botanicals"
  //               fill
  //               className="object-cover hover:scale-110 transition-transform duration-500"
  //             />
  //           </span>
  //         </motion.span>

  //         <motion.p variants={itemVariants} className="inline">
  //           and timeless artisanal pieces crafted for unforgettable sillage.
  //         </motion.p>
  //       </motion.div>

  //       {/* Editorial Subtext */}
  //       <motion.p
  //         initial={{ opacity: 0, y: 15 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ duration: 0.7, delay: 0.3 }}
  //         className="mt-8 text-sm sm:text-base text-[#6E6472] max-w-2xl mx-auto font-normal leading-relaxed tracking-wide"
  //       >
  //         Compounded with noble ambers, nocturnal violet florals, and rare aged woods,
  //         each formulation evolves intimately, creating a radiant aura that lingers effortlessly across day and night.
  //       </motion.p>

  //       {/* Link */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 10 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ duration: 0.7, delay: 0.4 }}
  //         className="mt-8"
  //       >
  //         <Link
  //           href="/collections"
  //           className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#21132F] hover:text-[#C8A45D] transition-colors luxury-link pb-1"
  //         >
  //           <span>Discover The Atelier Editions</span>
  //           <FiArrowRight className="ml-2 w-3.5 h-3.5 text-[#C8A45D]" />
  //         </Link>
  //       </motion.div>

  //     </div>
  //   </section>
  // );
  return null;
};

export default Heading;