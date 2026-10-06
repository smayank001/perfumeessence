'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productType } from '@/type';
import { FiX, FiCheck } from 'react-icons/fi';

const cities = [
  'Mumbai',
  'New Delhi',
  'Bengaluru',
  'Hyderabad',
  'Jaipur',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Chandigarh',
  'Goa',
  'Chennai',
];

const names = [
  'Aanya',
  'Rhea',
  'Kabir',
  'Arjun',
  'Tara',
  'Devika',
  'Zoya',
  'Samarth',
  'Pooja',
  'Rohan',
  'Isha',
  'Ananya',
  'Karan',
];

const SalesPop = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: '',
    city: '',
    product: '',
    slug: '',
    category: '',
    time: '',
  });
  const [products, setProducts] = useState<productType[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      setProducts(Array.isArray(json?.data) ? json.data : []);
    } catch (error) {
      console.error('Failed to fetch products for SalesPop', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const triggerPop = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomTime = Math.floor(Math.random() * 40) + 3;

      setData({
        name: randomName,
        city: randomCity,
        product: randomProduct.name,
        slug: randomProduct.slug,
        category: randomProduct.category || 'perfumes',
        time: `${randomTime}m ago`,
      });

      setShow(true);
      setTimeout(() => setShow(false), 5000);
    };

    const initialTimeout = setTimeout(triggerPop, 7000);
    const interval = setInterval(triggerPop, 35000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [products]);

  if (!show || !data.product) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[80] font-serif select-none animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#FFFFFF] border border-[#D8CEDA] shadow-[0_12px_32px_-8px_rgba(33,19,47,0.12)] p-3.5 flex items-center gap-3.5 max-w-[340px] relative">
        {/* Verification Checkmark */}
        <div className="w-8 h-8 rounded-full bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center flex-shrink-0 text-[#C8A45D]">
          <FiCheck className="w-4 h-4" />
        </div>

        <div className="flex flex-col pr-4 overflow-hidden">
          <p className="text-[11px] text-[#6E6472] leading-tight">
            <span className="font-medium text-[#21132F]">{data.name}</span> in{' '}
            <span className="text-[#21132F]">{data.city}</span>
          </p>
          <Link
            href={`/collections/${data.category}/${data.slug}`}
            className="text-[11px] text-[#21132F] font-normal mt-0.5 truncate hover:text-[#C8A45D] transition-colors"
          >
            Acquired <span className="underline decoration-[#C8A45D]">{data.product}</span>
          </Link>
          <span className="text-[9px] text-[#68447F] uppercase tracking-[0.15em] mt-1">
            Verified Purchase • {data.time}
          </span>
        </div>

        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-[#A58AB8] hover:text-[#21132F] transition-colors p-1 cursor-pointer"
          aria-label="Dismiss"
        >
          <FiX className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SalesPop;
