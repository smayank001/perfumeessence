import type { Metadata } from 'next';
import React from "react";
import axios from "axios";
import CardTwo from '@/components/customer/CardTwo';
import { productType } from '@/type';

async function getData(query: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`);
  return res.data.products;
}

export const generateMetadata = async ({searchParams}: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> => { 
  const query = (await searchParams).q || "";

  return {
    title: `Search Result for ${query}`,
    description: `Search Result for ${query}, Discover Premium Watches, Jewelry, rings and long lasting perfumes`
} };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q || "";
  const products = query ? await getData(query) : [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-30">
      <h1 className='font-semibold text-lg'>Search Result for "{query}"</h1>

      {products.length > 0 ? (
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
          {products.map((product: productType) => (
            <CardTwo key={product._id} collectionSlug={product.category} {...product} />
          ))}
        </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No products found matching “{query}”.
        </p>
      )}
    </main>
  );
}
