import NewArrivalsSection from '@/components/customer/NewArrivalsSection';
import { connectDB } from '@/lib/config/database';
import ProductSchema from '@/lib/models/ProductSchema';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const NewArrival = async () => {
  const isDatabaseConnected = await connectDB();

  if (!isDatabaseConnected) {
    return null;
  }

  const res = await ProductSchema
    .find({})
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const products = JSON.parse(JSON.stringify(res));

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#F5F0F7] py-16 md:py-24 px-4 sm:px-6 lg:px-10 border-b border-[#D8CEDA] font-serif select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#D8CEDA]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] font-normal">
                01 — NEW ATELIER RELEASES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#21132F] font-normal tracking-tight">
              Recent Additions to the Atelier
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6472] mt-1.5 font-normal tracking-wide">
              Freshly compounded formulations and newly released handcrafted luxury pieces.
            </p>
          </div>

          <Link
            href="/collections/all"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#21132F] hover:text-[#C8A45D] transition-colors luxury-link self-start md:self-auto"
          >
            <span>View All New</span>
            <FiArrowRight className="ml-2 w-4 h-4 text-[#C8A45D]" />
          </Link>
        </div>

        {/* Carousel / Product Slider */}
        <NewArrivalsSection products={products} />
      </div>
    </section>
  );
};

export default NewArrival;
