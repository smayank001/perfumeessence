'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const quickSearches = [
  'Moon Essence Perfumes',
  'Signature Fragrances',
  'Precision Timepieces',
  'Fine Jewelry Sets',
  'Gold Plated Bracelets',
];

const SearchBar = ({ isSearchOpen }: { isSearchOpen: (searchOpen: boolean) => void }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') isSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    isSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleQuickSearch = (term: string) => {
    isSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#19151D]/75 backdrop-blur-md flex flex-col items-center justify-start pt-24 md:pt-32 px-4 font-serif select-none"
        onClick={() => isSearchOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl bg-[#FFFFFF] border border-[#D8CEDA] shadow-2xl p-6 sm:p-10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => isSearchOpen(false)}
            className="absolute top-5 right-5 p-2 text-[#A58AB8] hover:text-[#21132F] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D]">
              Haute Parfumerie Atelier
            </span>
            <h3 className="text-xl sm:text-2xl text-[#21132F] mt-1 tracking-wide font-normal">
              Search the Moon Essence Atelier Collection
            </h3>
          </div>

          <form onSubmit={handleSearch} className="relative w-full">
            <div className="flex items-center border-b-2 border-[#21132F] pb-3 pt-2">
              <FiSearch className="text-lg text-[#68447F] mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search perfumes, rare notes, fine jewelry, timepieces..."
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg text-[#21132F] placeholder-[#A58AB8]/60 font-serif tracking-wide"
              />
              <button
                type="submit"
                className="ml-2 text-xs uppercase tracking-[0.2em] px-4 py-2 bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Search</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="mt-6 pt-5 border-t border-[#F5F0F7] flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#68447F] mr-2">
              Popular:
            </span>
            {quickSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickSearch(term)}
                className="text-xs tracking-[0.06em] text-[#6E6472] bg-[#F7F2E8] hover:bg-[#EFE7DA] hover:text-[#21132F] px-3 py-1.5 border border-[#D8CEDA] transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;
