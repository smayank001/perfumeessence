import Link from 'next/link';
import React from 'react';

const CheckoutHeader = () => {
  return (
    <header className="flex flex-col items-center justify-center py-5 border-b border-[#D8CEDA] bg-[#F7F2E8] font-serif select-none">
      <Link href="/" className="flex flex-col items-center justify-center group">
        <span className="text-lg sm:text-xl tracking-[0.24em] uppercase font-normal text-[#21132F] group-hover:text-[#68447F] transition-colors">
          THE PERFUME ESSENCE
        </span>
        <span className="text-[8px] tracking-[0.38em] uppercase text-[#68447F] -mt-0.5">
          HAUTE PARFUMERIE • MOON ESSENCE
        </span>
      </Link>
    </header>
  );
};

export default CheckoutHeader;
