import type { Metadata } from 'next';
import React from 'react';
import axios from 'axios';
import CardTwo from '@/components/customer/CardTwo';
import { productType } from '@/type';
import { NEXT_PUBLIC_BASE_URL } from '@/config';
import Link from 'next/link';
import { FiArrowRight, FiSearch } from 'react-icons/fi';

async function getData(query: string) {
  try {
    const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`);
    return res.data.products || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> => {
  const query = (await searchParams).q || '';

  return {
    title: `Search: "${query}" — THE PERFUME ESSENCE`,
    description: `Search results for ${query}. Discover haute parfumerie, luxury fragrances, fine jewelry, and precision timepieces.`,
  };
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q || '';
  const products = query ? await getData(query) : [];

  return (
    <main className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto font-serif">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#D8CEDA]">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A45D] font-normal block mb-1">
          THE ATELIER SEARCH
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#21132F] font-normal tracking-tight">
          {query ? `Results for “${query}”` : 'Search Fragrances & Essentials'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6472] mt-1 font-normal">
          {products.length} {products.length === 1 ? 'piece' : 'pieces'} found in the collection.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: productType) => (
            <CardTwo
              key={product._id}
              collectionSlug={product.category}
              {...product}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-10 sm:p-16 max-w-xl mx-auto text-center shadow-sm">
          <div className="w-14 h-14 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center mx-auto mb-4 text-[#A58AB8]">
            <FiSearch size={24} />
          </div>
          <h2 className="text-2xl text-[#21132F] font-normal mb-2">
            No Exact Matches Found
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6472] leading-relaxed mb-6 font-normal">
            We could not find any perfumes or accessories matching “{query}”. Try searching for “Moon Essence”, “Perfume”, “Gold”, or “Watch”.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/collections/perfumes"
              className="btn-luxury-primary"
            >
              <span>Explore Perfumes</span>
              <FiArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/collections/all"
              className="btn-luxury-secondary"
            >
              <span>View All Pieces</span>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
