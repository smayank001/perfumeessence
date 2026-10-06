import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const CheckoutHeader = () => {
  return (
    <header className="flex flex-col items-center justify-center py-4 border-b border-[#D8CEDA] bg-[#F7F2E8] font-serif select-none">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#C8A45D]/60 bg-[#19151D] shadow-sm flex-shrink-0">
          <Image
            src="/logo.png"
            alt="The Perfume Essence Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-base sm:text-lg tracking-[0.24em] uppercase font-normal text-[#21132F] group-hover:text-[#68447F] transition-colors">
            THE PERFUME ESSENCE
          </span>
          <span className="text-[7.5px] sm:text-[8px] tracking-[0.38em] uppercase text-[#68447F] -mt-0.5">
            HAUTE PARFUMERIE • MOON ESSENCE
          </span>
        </div>
      </Link>
    </header>
  );
};

export default CheckoutHeader;
