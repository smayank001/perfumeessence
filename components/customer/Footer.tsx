'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram, FiFacebook, FiArrowRight, FiCheck } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative w-full bg-[#21132F] text-[#F7F2E8] font-serif border-t border-[#45265C] select-none">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C8A45D]/60 bg-[#19151D] shadow-md flex-shrink-0 group-hover:border-[#C8A45D] transition-colors">
                <Image
                  src="/logo.png"
                  alt="The Perfume Essence Insignia"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl tracking-[0.24em] uppercase font-normal text-[#F7F2E8] group-hover:text-[#DCC7A3] transition-colors">
                  THE PERFUME ESSENCE
                </span>
                <span className="text-[9px] tracking-[0.38em] uppercase text-[#DCC7A3]">
                  MOON ESSENCE ATELIER • EST. 2024
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A58AB8] leading-relaxed font-normal max-w-sm">
              An Indian luxury fragrance house and purveyor of nocturnal essences, 
              handcrafted jewelry, and precision timepieces. Crafted to inspire lingering memories.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#DCC7A3]">
                Follow Us:
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#45265C] bg-[#2C183D] flex items-center justify-center text-[#DCC7A3] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-all"
              >
                <FiInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#45265C] bg-[#2C183D] flex items-center justify-center text-[#DCC7A3] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-all"
              >
                <FiFacebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop / Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-normal pb-2 border-b border-[#45265C]">
              Shop Collections
            </h4>
            <nav className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#A58AB8]">
              <Link href="/collections/perfumes" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Moon Essence Perfumes
              </Link>
              <Link href="/collections/deals" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Signature Fragrances
              </Link>
              <Link href="/collections/watches" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Precision Timepieces
              </Link>
              <Link href="/collections/jewelry-set" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Fine Jewellery Sets
              </Link>
              <Link href="/collections/stainless-steel-bracelets" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Stainless Steel Bracelets
              </Link>
              <Link href="/collections/gold-platted-bracelets" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Gold Plated Collection
              </Link>
              <Link href="/collections/all" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                All Atelier Releases
              </Link>
            </nav>
          </div>

          {/* Column 3: Customer Care (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-normal pb-2 border-b border-[#45265C]">
              Customer Care
            </h4>
            <nav className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#A58AB8]">
              <Link href="/contact-information" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Contact Concierge
              </Link>
              <Link href="/shipping-policy" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Shipping & Delivery
              </Link>
              <Link href="/return-refund-policy" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Returns & Exchanges
              </Link>
              <Link href="/privacy-policy" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Privacy Policy
              </Link>
              <Link href="/terms-service" className="hover:text-[#F7F2E8] transition-colors luxury-link self-start">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Column 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-normal pb-2 border-b border-[#45265C]">
              Join the Atelier
            </h4>
            <p className="text-xs text-[#A58AB8] leading-relaxed font-normal">
              Receive private invitations, fragrance releases, and exclusive member privileges.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 bg-[#2C183D] border border-[#45265C] text-xs text-[#F7F2E8] placeholder-[#A58AB8]/60 focus:outline-none focus:border-[#C8A45D] font-serif transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C8A45D] text-[#19151D] hover:bg-[#DCC7A3] hover:text-[#19151D] py-3 text-[11px] uppercase tracking-[0.2em] font-normal flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                {subscribed ? (
                  <>
                    <FiCheck className="w-3.5 h-3.5" />
                    <span>Subscribed to Atelier</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Geo Bar */}
      <div className="border-t border-[#45265C] bg-[#19151D] py-6 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-[#A58AB8]">
          <p>© {new Date().getFullYear()} THE PERFUME ESSENCE. ALL RIGHTS RESERVED.</p>
          <p className="text-center md:text-right text-[#DCC7A3]">
            BASED IN NEW DELHI • DELIVERING TO MUMBAI, BENGALURU & PAN-INDIA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
