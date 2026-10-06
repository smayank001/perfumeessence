import Link from 'next/link';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F2E8] flex items-center justify-center px-4 font-serif select-none pt-28 pb-20">
      <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-10 sm:p-16 max-w-lg w-full text-center shadow-sm">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8A45D] block mb-2 font-normal">
          ATELIER 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal text-[#21132F] mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6472] max-w-xs mx-auto mb-8 font-normal leading-relaxed">
          The formulation or page you are seeking is either archived or unavailable in the Atelier directory.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-luxury-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <span>Return to Atelier</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/collections/perfumes"
            className="btn-luxury-secondary w-full sm:w-auto inline-flex items-center justify-center"
          >
            <span>Explore Perfumes</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
