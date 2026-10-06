'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const luxuryPillars = [
  {
    number: '01',
    title: 'Complimentary Insured Shipping',
    desc: 'Enjoy insured, complimentary express delivery across India on all orders exceeding ₹5,000.',
  },
  {
    number: '02',
    title: 'Nocturnal Formulations',
    desc: 'Compounded with rare essences, pure botanical extraits, and long-lasting 12+ hour sillage.',
  },
  {
    number: '03',
    title: 'Authentic Craftsmanship',
    desc: '100% verified authentic materials, hypoallergenic stainless steel, and gold plating.',
  },
  {
    number: '04',
    title: 'Pan-India Express',
    desc: 'Rapid express logistics reaching Mumbai, New Delhi, Bengaluru, Hyderabad, and every corner of India.',
  },
  {
    number: '05',
    title: 'Signature Velvet Packaging',
    desc: 'Moon Essence luxury presentation boxes designed for an unforgettable unboxing and gifting experience.',
  },
  {
    number: '06',
    title: 'Fragrance Concierge',
    desc: 'Dedicated olfactory and styling specialists to assist you with bespoke fragrance recommendations.',
  },
];

const About = () => {
  return (
    <section className="relative w-full bg-[#EFE7DA] py-16 md:py-28 px-4 sm:px-6 lg:px-10 border-b border-[#D8CEDA] font-serif overflow-hidden select-none">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">

        {/* PART 1: Magazine Spread Brand Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Large Editorial Image */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative bg-[#FFFFFF] p-3 sm:p-5 border border-[#D8CEDA] shadow-[0_20px_50px_-20px_rgba(33,19,47,0.1)]">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#21132F]">
                <Image
                  src="/moon_essence_1.jpg"
                  alt="THE PERFUME ESSENCE Atelier Craftsmanship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-[2000ms] hover:scale-105"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-[#68447F]">
                <span>ATELIER NO. 24</span>
                <span className="text-[#C8A45D]">MOON ESSENCE COLLECTION</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 lg:pl-4"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-[#C8A45D]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#68447F] font-normal">
                THE PERFUME ESSENCE
              </span>
            </div>

            {/* <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-[#21132F] font-normal tracking-tight">
              A SCENT, <br />
              <span className="italic font-normal text-[#68447F]">A SIGNATURE,</span> <br />
              AN IDENTITY.
            </h2> */}

            <div className="w-16 h-px bg-[#C8A45D]" />

            <p className="text-base sm:text-lg text-[#6E6472] leading-relaxed font-normal">
              Born from a passion for rare nocturnal essences and timeless refinement, THE PERFUME ESSENCE was created
              to bring haute parfumerie, artisanal craftsmanship, and poetic luxury to the modern connoisseur.
            </p>

            <p className="text-sm sm:text-base text-[#6E6472] leading-relaxed font-normal">
              Every bottle in our Moon Essence atelier represents a masterclass in formulation—blending exotic agarwood,
              night-blooming jasmine, rich amber, and velvety violet florals that evolve intimately on your skin.
              Alongside our fragrances, our curated timepieces and jewelry reflect the same unwavering commitment to perfection.
            </p>

            <div className="pt-4">
              <Link
                href="/contact-information"
                className="btn-luxury-secondary"
              >
                <span>Read Our Story</span>
                <FiArrowRight className="ml-2 w-4 h-4 text-[#C8A45D]" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* PART 2: Why Choose Us — The Principles of Luxury */}
        <div className="pt-10 border-t border-[#D8CEDA]">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D8CEDA]">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A45D] font-normal block mb-1">
                OUR COMMITMENT
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#21132F] font-normal tracking-tight">
                The Principles of Our Atelier
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6E6472] mt-2 md:mt-0 max-w-sm tracking-wide font-normal">
              Crafted without compromise, delivered with distinction across India.
            </p>
          </div>

          {/* Editorial Numbered Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {luxuryPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#D8CEDA] transition-all duration-400 hover:border-[#C8A45D] hover:shadow-[0_12px_32px_-12px_rgba(33,19,47,0.08)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl sm:text-3xl text-[#C8A45D] font-normal block mb-4">
                    {pillar.number}
                  </span>
                  <h4 className="text-lg sm:text-xl text-[#21132F] font-normal tracking-wide mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6E6472] leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
                <div className="w-8 h-px bg-[#D8CEDA] mt-6" />
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;