'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const editorialCollections = [
  {
    title: 'Moon Essence Perfumes',
    subtitle: 'Extrait de Parfum & Artisanal Blends',
    description: 'Compounded with rare botanicals, precious ouds, and velvet ambers.',
    category: 'HAUTE PARFUMERIE',
    image: '/moon_essence_1.jpg',
    link: '/collections/perfumes',
    featured: true,
  },
  {
    title: 'Signature Fragrances',
    subtitle: 'Private Atelier Blends',
    description: 'Captivating sillage crafted for memorable evenings and nocturnal mystery.',
    category: 'EXCLUSIVE EDIT',
    image: '/moon_essence_2.jpg',
    link: '/collections/deals',
    featured: false,
  },
  {
    title: 'Precision Timepieces',
    subtitle: 'Classic Precision & Craft',
    description: 'Elegance for every hour.',
    category: 'TIMEPIECES',
    image: '/Images/image copy 3.png',
    link: '/collections/watches',
    featured: false,
  },
  {
    title: 'Fine Jewellery Sets',
    subtitle: 'Heirloom Design & Luster',
    description: 'Matching sets of understated grace.',
    category: 'JEWELLERY',
    image: '/Images/image copy 4.png',
    link: '/collections/jewelry-set',
    featured: false,
  },
  {
    title: 'Gold Plated & Steel',
    subtitle: 'Tarnish-Free Daily Luxury',
    description: 'Resilient beauty for everyday wear.',
    category: 'WRISTWEAR',
    image: '/Images/image copy 7.png',
    link: '/collections/stainless-steel-bracelets',
    featured: false,
  },
];

const Collections = () => {
  const mainFeature = editorialCollections[0];
  const secondaryFeature = editorialCollections[1];
  const gridCollections = editorialCollections.slice(2);

  return (
    <section className="relative w-full bg-[#F7F2E8] py-16 md:py-24 px-4 sm:px-6 lg:px-10 border-b border-[#D8CEDA] font-serif select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-[#D8CEDA]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#C8A45D]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#68447F] font-normal">
                CURATED EDITIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#21132F] font-normal tracking-tight">
              Explore Our Signature Collections
            </h2>
          </div>

          <Link
            href="/collections/all"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#21132F] hover:text-[#C8A45D] transition-colors luxury-link self-start md:self-auto"
          >
            <span>View All Collections</span>
            <FiArrowRight className="ml-2 w-4 h-4 text-[#C8A45D]" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Top Row: Large Feature + Complementary Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Feature 1: Luxury Perfumes (7 Columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <Link
                href={mainFeature.link}
                className="group block relative bg-[#FFFFFF] border border-[#D8CEDA] overflow-hidden p-6 sm:p-8 transition-all duration-500 hover:border-[#C8A45D] hover:shadow-[0_16px_40px_-16px_rgba(33,19,47,0.12)]"
              >
                <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden bg-[#21132F] mb-6">
                  <Image
                    src={mainFeature.image}
                    alt={mainFeature.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-[#21132F]/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-[#F7F2E8] border border-[#C8A45D]/40">
                    {mainFeature.category}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#68447F]">
                      {mainFeature.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl text-[#21132F] font-normal tracking-wide mt-1 group-hover:text-[#68447F] transition-colors">
                      {mainFeature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E6472] max-w-md mt-1.5 leading-relaxed font-normal">
                      {mainFeature.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#21132F] font-normal group-hover:text-[#C8A45D] transition-colors self-start sm:self-auto whitespace-nowrap">
                    <span>Explore Collection</span>
                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Feature 2: Signature Fragrances (5 Columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <Link
                href={secondaryFeature.link}
                className="group block relative bg-[#FFFFFF] border border-[#D8CEDA] overflow-hidden p-6 sm:p-8 h-full flex flex-col justify-between transition-all duration-500 hover:border-[#C8A45D] hover:shadow-[0_16px_40px_-16px_rgba(33,19,47,0.12)]"
              >
                <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden bg-[#21132F] mb-6">
                  <Image
                    src={secondaryFeature.image}
                    alt={secondaryFeature.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-[#21132F]/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-[#F7F2E8] border border-[#C8A45D]/40">
                    {secondaryFeature.category}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#68447F]">
                      {secondaryFeature.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl text-[#21132F] font-normal tracking-wide mt-1 group-hover:text-[#68447F] transition-colors">
                      {secondaryFeature.title}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#21132F] font-normal group-hover:text-[#C8A45D] transition-colors self-start whitespace-nowrap pt-2">
                    <span>Explore Collection</span>
                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>

          {/* Bottom Row: 3 Editorial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gridCollections.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link
                  href={item.link}
                  className="group block relative bg-[#FFFFFF] border border-[#D8CEDA] overflow-hidden p-5 sm:p-6 transition-all duration-500 hover:border-[#C8A45D] hover:shadow-[0_12px_32px_-12px_rgba(33,19,47,0.08)]"
                >
                  <div className="relative w-full h-[260px] sm:h-[280px] overflow-hidden bg-[#F5F0F7] mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3 left-3 bg-[#FFFFFF]/95 backdrop-blur-sm px-2.5 py-0.5 text-[8px] uppercase tracking-[0.25em] text-[#21132F] border border-[#D8CEDA]">
                      {item.category}
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#68447F]">
                        {item.subtitle}
                      </span>
                      <h4 className="text-lg text-[#21132F] font-normal tracking-wide mt-0.5 group-hover:text-[#68447F] transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <FiArrowUpRight className="w-4 h-4 text-[#21132F] group-hover:text-[#C8A45D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mb-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Collections;