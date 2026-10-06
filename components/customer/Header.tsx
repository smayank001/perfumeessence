'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headerLinks } from '@/lib/constants';
import { FiChevronDown, FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi';
import Menu from './Menu';
import SearchBar from './SearchBar';
import SideBarCart from './SideBarCart';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [small, setSmall] = useState(false);
  const [sideBarCartOpen, setSideBarCartOpen] = useState(false);
  const { cart } = useCart();

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSize = () => {
      setSmall(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleSize);
    handleSize();

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    if (menuOpen && small) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, small]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full select-none font-serif">
      {/* Top Announcement Bar — Deep Moonlit Purple (#21132F) with Champagne Gold (#DCC7A3 / #C8A45D) */}
      <div className="w-full bg-[#21132F] text-[#F7F2E8] py-2 px-4 text-center border-b border-[#45265C] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-normal">
          <span className="hidden lg:inline-block text-[#A58AB8] tracking-[0.25em]">
            MOON ESSENCE • HAUTE PARFUMERIE
          </span>
          <span className="mx-auto lg:mx-0 tracking-[0.22em] font-normal text-[#DCC7A3]">
            COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹5,000 • PAN-INDIA EXPRESS
          </span>
          <span className="hidden lg:inline-block text-[#C8A45D] tracking-[0.25em]">
            LIMITED ARTISANAL BATCHES
          </span>
        </div>
      </div>

      {/* Main Luxury Navigation Bar — Warm Ivory (#F7F2E8) with Deep Plum Typography (#21132F) */}
      <div
        className={`w-full transition-all duration-400 ease-in-out border-b ${
          scrolled
            ? 'bg-[#F7F2E8]/95 backdrop-blur-md border-[#D8CEDA] shadow-[0_4px_24px_-6px_rgba(33,19,47,0.08)] py-3 sm:py-3.5'
            : 'bg-[#F7F2E8] border-[#D8CEDA]/90 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 -ml-2 text-[#21132F] hover:text-[#C8A45D] transition-colors focus:outline-none cursor-pointer"
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-2.5 sm:gap-3 transition-opacity duration-300 hover:opacity-85"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#C8A45D]/60 bg-[#19151D] shadow-sm flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="The Perfume Essence Emblem"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm sm:text-base md:text-lg xl:text-xl tracking-[0.22em] uppercase font-normal text-[#21132F] whitespace-nowrap">
                  THE PERFUME ESSENCE
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.35em] uppercase text-[#68447F] -mt-0.5">
                  HAUTE PARFUMERIE • MOON ESSENCE
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links — Centered Luxury Typography */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {headerLinks.map((link) => {
              const hasSub = link.subCategory && link.subCategory.length > 0;
              const isMenuOpen = openMenu === link.name;

              return (
                <div
                  key={link.name}
                  className="relative py-1.5"
                  onMouseEnter={() => hasSub && setOpenMenu(link.name)}
                  onMouseLeave={() => hasSub && setOpenMenu(null)}
                >
                  {hasSub ? (
                    <button
                      onClick={() => setOpenMenu(isMenuOpen ? null : link.name)}
                      className={`text-[12px] xl:text-[13px] uppercase tracking-[0.18em] font-normal flex items-center gap-1 transition-colors py-1 cursor-pointer ${
                        isMenuOpen ? 'text-[#C8A45D]' : 'text-[#21132F] hover:text-[#C8A45D]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <FiChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          isMenuOpen ? 'rotate-180 text-[#C8A45D]' : 'opacity-60 text-[#21132F]'
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.link}
                      className="text-[12px] xl:text-[13px] uppercase tracking-[0.18em] font-normal text-[#21132F] hover:text-[#C8A45D] transition-colors py-1 luxury-link"
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Refined Luxury Dropdown Menu */}
                  {hasSub && isMenuOpen && (
                    <div className="absolute top-full left-0 pt-2 z-50 min-w-[260px] animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-4 shadow-[0_16px_36px_-8px_rgba(33,19,47,0.12)]">
                        <div className="text-[9px] uppercase tracking-[0.25em] text-[#68447F] pb-2 mb-2 border-b border-[#F5F0F7]">
                          {link.name} Editions
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          {link.subCategory.map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.link}
                              onClick={() => setOpenMenu(null)}
                              className="text-[12px] tracking-[0.08em] text-[#6E6472] hover:text-[#21132F] hover:bg-[#F5F0F7] hover:translate-x-1 transition-all py-1.5 px-2.5"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/contact-information"
              className="text-[12px] xl:text-[13px] uppercase tracking-[0.18em] font-normal text-[#21132F] hover:text-[#C8A45D] transition-colors py-1 luxury-link"
            >
              ABOUT
            </Link>
          </nav>

          {/* Right Utilities: Search, Concierge, Cart */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-2 text-[#21152F] hover:text-[#C8A45D] transition-colors cursor-pointer"
              aria-label="Search Fragrances"
              title="Search"
            >
              <FiSearch className="w-4 h-4 sm:w-[17px] sm:h-[17px] transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden xl:inline-block text-[11px] uppercase tracking-[0.2em] font-normal">
                SEARCH
              </span>
            </button>

            {/* Client Concierge */}
            <Link
              href="/contact-information"
              className="hidden sm:flex items-center text-[11px] uppercase tracking-[0.2em] text-[#21152F] hover:text-[#C8A45D] transition-colors luxury-link"
              title="Customer Care"
            >
              CONCIERGE
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setSideBarCartOpen(true)}
              className="group relative flex items-center gap-2 text-[#21152F] hover:text-[#C8A45D] transition-colors cursor-pointer py-1"
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <div className="relative">
                <FiShoppingBag className="w-4 h-4 sm:w-[17px] sm:h-[17px] transition-transform duration-300 group-hover:scale-110" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#21132F] text-[#F7F2E8] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-serif font-medium border border-[#C8A45D]">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline-block text-[11px] uppercase tracking-[0.2em] font-normal">
                BAG {totalCartCount > 0 && `(${totalCartCount})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Component */}
      {menuOpen && <Menu setMenuOpen={setMenuOpen} />}

      {/* Search Modal Overlay */}
      {searchOpen && <SearchBar isSearchOpen={setSearchOpen} />}

      {/* Sidebar Cart Drawer */}
      {sideBarCartOpen && (
        <SideBarCart isOpen={sideBarCartOpen} setIsOpen={setSideBarCartOpen} />
      )}
    </header>
  );
};

export default Header;
