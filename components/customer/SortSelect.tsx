'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const SortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') ?? 'date-new-old';

  return (
    <select
      value={currentSort}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', e.target.value);
        router.push(`?${params.toString()}`);
      }}
      className="border border-[#D8CEDA] bg-[#FFFFFF] outline-none text-[#21132F] text-xs font-serif tracking-wide py-1.5 px-3 focus:border-[#21132F] transition-colors cursor-pointer"
    >
      <option value="date-new-old">Newest Additions</option>
      <option value="date-old-new">Oldest Editions</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low">Price: High to Low</option>
    </select>
  );
};

export default SortSelect;
