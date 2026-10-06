'use client';

import { headerLinks } from '@/lib/constants';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiX, FiArrowRight } from 'react-icons/fi';

const Menu = ({
  setMenuOpen,
}: {
  setMenuOpen: (open: boolean) => void;
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] bg-[#19151D]/70 backdrop-blur-sm"
        onClick={() => setMenuOpen(false)}
      >
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#F7F2E8] text-[#19151D] shadow-2xl border-r border-[#D8CEDA] flex flex-col justify-between overflow-y-auto select-none font-serif"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="p-6 border-b border-[#D8CEDA] bg-[#EFE7DA] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm tracking-[0.24em] uppercase font-normal text-[#21132F]">
                THE PERFUME ESSENCE
              </span>
              <span className="text-[8px] tracking-[0.38em] uppercase text-[#68447F]">
                HAUTE PARFUMERIE • MOON ESSENCE
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-[#21132F] hover:text-[#C8A45D] transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#68447F] mb-4">
              Atelier Directory
            </div>
            <ul className="flex flex-col divide-y divide-[#D8CEDA]/60">
              {headerLinks.map((item) => (
                <li key={item.name} className="py-3">
                  {item.subCategory && item.subCategory.length > 0 ? (
                    <div>
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className="flex justify-between items-center w-full text-base tracking-[0.14em] text-[#21132F] hover:text-[#C8A45D] transition-colors py-1 cursor-pointer text-left"
                      >
                        <span>{item.name}</span>
                        <FiChevronDown
                          className={`w-4 h-4 text-[#A58AB8] transition-transform duration-300 ${
                            openSubMenu === item.name ? 'rotate-180 text-[#C8A45D]' : ''
                          }`}
                        />
                      </button>

                      {/* Subcategory List */}
                      <AnimatePresence>
                        {openSubMenu === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-2 pl-4 pt-2.5 pb-1 overflow-hidden"
                          >
                            {item.subCategory.map((sub, i) => (
                              <Link
                                key={i}
                                href={sub.link}
                                onClick={() => setMenuOpen(false)}
                                className="text-sm tracking-[0.06em] text-[#6E6472] hover:text-[#21132F] py-1 transition-colors flex items-center justify-between"
                              >
                                <span>{sub.name}</span>
                                <FiArrowRight className="w-3 h-3 text-[#C8A45D] opacity-70" />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => setMenuOpen(false)}
                      className="block text-base tracking-[0.14em] text-[#21132F] hover:text-[#C8A45D] transition-colors py-1"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}

              <li className="py-3">
                <Link
                  href="/contact-information"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base tracking-[0.14em] text-[#21132F] hover:text-[#C8A45D] transition-colors py-1"
                >
                  About the Atelier
                </Link>
              </li>
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 bg-[#EFE7DA] border-t border-[#D8CEDA] space-y-3">
            <div className="text-[9px] uppercase tracking-[0.25em] text-[#68447F]">
              Client Concierge
            </div>
            <div className="flex flex-col space-y-1.5 text-xs tracking-[0.06em] text-[#6E6472]">
              <Link
                href="/shipping-policy"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#21132F] transition-colors"
              >
                Shipping & Delivery
              </Link>
              <Link
                href="/return-refund-policy"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#21132F] transition-colors"
              >
                Returns & Exchanges
              </Link>
              <Link
                href="/contact-information"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#21132F] transition-colors"
              >
                Contact Fragrance Concierge
              </Link>
            </div>
            <div className="pt-2 text-[10px] tracking-[0.15em] text-[#68447F] uppercase">
              Free Shipping Across India Above ₹5,000
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
};

export default Menu;
