'use client';

import { headerLinks } from '@/lib/constants';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

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
    <motion.aside
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 top-17 z-50 bg-white overflow-y-auto"
    >
      <nav className="pt-6">
        <ul className="flex flex-col gap-6 text-lg font-light px-10">
          {headerLinks.map((item) => (
            <li key={item.name} className="flex flex-col gap-2">

              {/* MAIN ITEM */}
              {item.subCategory?.length > 0 ? (
                <button
                  onClick={() => toggleSubMenu(item.name)}
                  className="flex justify-between items-center w-full"
                >
                  <span>{item.name}</span>
                  <FiChevronDown
                    className={`transition-transform ${
                      openSubMenu === item.name ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full"
                >
                  {item.name}
                </Link>
              )}

              {/* SUB MENU */}
              <AnimatePresence>
                {openSubMenu === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 pl-4 text-base text-zinc-600 overflow-hidden"
                  >
                    {item.subCategory.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.link}
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-black"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
    </AnimatePresence>
  );
};

export default Menu;
