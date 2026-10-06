import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

type Props = {
  collection: string;
  product?: string;
};

const BreadCrumps = ({ collection, product }: Props) => {
  const formattedCollection = collection.replace(/-/g, ' ');

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 uppercase text-[10px] sm:text-[11px] tracking-[0.2em] text-[#6E6472] my-4 font-serif select-none">
      <Link href="/" className="hover:text-[#21132F] transition-colors">
        Home
      </Link>
      <FiChevronRight className="w-3 h-3 text-[#D8CEDA]" />
      <Link href={`/collections/${collection}`} className="hover:text-[#21132F] transition-colors">
        {formattedCollection}
      </Link>
      {product && (
        <>
          <FiChevronRight className="w-3 h-3 text-[#D8CEDA]" />
          <span className="text-[#21132F] font-medium truncate max-w-[200px] sm:max-w-xs">{product}</span>
        </>
      )}
    </nav>
  );
};

export default BreadCrumps;
