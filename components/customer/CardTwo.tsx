'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Variant } from '@/type';
import { FiEye } from 'react-icons/fi';

type CardTwoProps = {
  name: string;
  price: number;
  salePrice?: number | null;
  onSale?: boolean;
  images: string[];
  slug: string;
  collectionSlug: string;
  variants: Variant[];
  hasVariants: boolean;
};

const CardTwo = ({
  name,
  price,
  salePrice,
  onSale,
  images,
  slug,
  collectionSlug,
  variants,
  hasVariants,
}: CardTwoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasStock = hasVariants
    ? (variants || []).some((v) => (v?.stock ?? 0) > 0)
    : (variants?.[0]?.stock ?? 0) > 0;

  const isSoldOut = !hasStock;
  const primaryImage = images?.[0] || '/Images/logo.png';
  const secondaryImage = images?.[1] || primaryImage;

  const targetCategory = collectionSlug || 'perfumes';
  const productHref = `/collections/${targetCategory}/${slug}`;

  // Formatted category title
  const formattedCategory = targetCategory
    .replace(/-/g, ' ')
    .toUpperCase();

  if (isSoldOut) {
    return (
      <div className="relative bg-[#FFFFFF] border border-[#D8CEDA] p-4 font-serif opacity-60 cursor-not-allowed select-none transition-all">
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F0F7] mb-4">
          <Image
            src={primaryImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center grayscale"
          />
          <div className="absolute top-3 right-3 bg-[#21132F] text-[#F7F2E8] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1">
            Sold Out
          </div>
        </div>

        {/* Product Details */}
        <div className="text-center space-y-1">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#A58AB8]">
            {formattedCategory}
          </span>
          <h3 className="text-base text-[#21132F] font-normal tracking-wide line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#6E6472] tracking-wider">
            <span>₹{price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#FFFFFF] border border-[#D8CEDA] p-4 font-serif transition-all duration-500 hover:border-[#C8A45D] hover:shadow-[0_12px_32px_-12px_rgba(33,19,47,0.12)] flex flex-col justify-between select-none"
    >
      <Link href={productHref} className="block">
        {/* Product Image Frame */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F0F7] mb-4">
          {/* Primary Image */}
          <Image
            src={isHovered && images?.length > 1 ? secondaryImage : primaryImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Badges: Sale or Exclusive */}
          {onSale && (
            <div className="absolute top-3 left-3 bg-[#21132F] text-[#C8A45D] border border-[#C8A45D]/40 text-[9px] uppercase tracking-[0.2em] font-normal px-2.5 py-0.5 shadow-sm">
              Atelier Offer
            </div>
          )}

          {/* Hover Reveal Action Bar */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <div className="w-full bg-[#21132F]/95 backdrop-blur-sm text-[#F7F2E8] py-2.5 px-3 text-[10px] uppercase tracking-[0.2em] font-normal flex items-center justify-center gap-1.5 border border-[#C8A45D]/50 hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-colors shadow-sm">
              <FiEye className="w-3.5 h-3.5" />
              <span>Discover Essence</span>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="text-center space-y-1.5 pt-1">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#68447F] block">
            {formattedCategory}
          </span>
          <h3 className="text-base text-[#21132F] font-normal tracking-wide group-hover:text-[#68447F] transition-colors line-clamp-1">
            {name}
          </h3>

          {/* Price Layout */}
          <div className="flex items-center justify-center gap-2 pt-0.5 text-xs text-[#19151D] tracking-wider">
            {onSale && salePrice ? (
              <>
                <span className="text-[#A58AB8] line-through text-[11px]">
                  ₹{price.toLocaleString()}
                </span>
                <span className="text-[#21132F] font-semibold">
                  ₹{salePrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-[#19151D]">
                ₹{price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardTwo;
