"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Box, Banknote, ShieldAlert, Camera, MessageSquare } from "lucide-react";
import Link from "next/link";

const policies = [
  {
    title: "7-Day Return Window",
    desc: "Request an exchange or return within 7 days of receiving your bespoke package.",
    icon: <RefreshCcw size={22} className="text-[#C8A45D]" />,
  },
  {
    title: "Original Presentation State",
    desc: "Items must remain unused, with all luxury seals intact, and within original Moon Essence velvet presentation packaging.",
    icon: <Box size={22} className="text-[#C8A45D]" />,
  },
  {
    title: "Prompt Refund Processing",
    desc: "Approved refunds are credited back to your original payment method or bank account within 5–7 business days.",
    icon: <Banknote size={22} className="text-[#C8A45D]" />,
  },
];

const Refund = () => {
  return (
    <main className="bg-[#F7F2E8] text-[#19151D] min-h-screen pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-12 font-serif select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="h-px w-6 bg-[#C8A45D]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#68447F] font-normal">
              PATRON GUARANTEE & SATISFACTION
            </span>
            <span className="h-px w-6 bg-[#C8A45D]" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#21132F] font-normal tracking-tight mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-[#6E6472] max-w-xl mx-auto font-normal leading-relaxed text-sm sm:text-base">
            Your satisfaction is our signature standard. If your piece or fragrance does not meet your expectations, our concierge will make it effortless.
          </p>
        </header>

        {/* Core Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {policies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#FFFFFF] p-8 border border-[#D8CEDA] hover:border-[#C8A45D] hover:shadow-[0_12px_32px_-12px_rgba(33,19,47,0.1)] transition-all duration-400 text-center flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-normal text-[#21132F] mb-2">{item.title}</h3>
                <p className="text-[#6E6472] text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>
              <div className="w-8 h-px bg-[#D8CEDA] mt-6" />
            </motion.div>
          ))}
        </div>

        {/* Detailed Requirements & Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eligibility */}
          <section className="bg-[#FFFFFF] p-8 md:p-10 border border-[#D8CEDA] shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#F5F0F7]">
              <ShieldAlert className="text-[#C8A45D]" size={22} />
              <h2 className="text-xl font-normal text-[#21132F]">Important Atelier Notes</h2>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-[#6E6472] font-normal leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] mt-1.5 shrink-0" />
                <span>Standard shipping logistics fees (₹300) are non-refundable once dispatched.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] mt-1.5 shrink-0" />
                <span>Special archive sale or promotional vault pieces are eligible for replacement in case of transit damage.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] mt-1.5 shrink-0" />
                <span>Refunds are initiated following inspection by our quality assurance atelier.</span>
              </li>
            </ul>
          </section>

          {/* How to initiate */}
          <section className="bg-[#21132F] p-8 md:p-10 border border-[#C8A45D]/40 text-[#F7F2E8] shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-normal text-[#DCC7A3] mb-6 pb-3 border-b border-[#45265C]">
                How to Request an Exchange
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <Camera className="text-[#C8A45D] shrink-0 mt-0.5" size={18} />
                  <p className="text-xs sm:text-sm text-[#A58AB8] leading-relaxed">
                    Take clear <span className="text-[#F7F2E8] font-medium">photographs</span> of the flacon/item and presentation packaging.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <MessageSquare className="text-[#C8A45D] shrink-0 mt-0.5" size={18} />
                  <p className="text-xs sm:text-sm text-[#A58AB8] leading-relaxed">
                    Reach our concierge via WhatsApp or Email with your <span className="text-[#F7F2E8] font-medium">Order Number</span>.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                href="/contact-information"
                className="btn-luxury-primary w-full text-center"
              >
                <span>Contact Concierge</span>
              </Link>
            </div>
          </section>
        </div>

        {/* Brand Note */}
        <p className="mt-14 text-center text-[10px] text-[#68447F] uppercase tracking-[0.25em]">
          THE PERFUME ESSENCE — Distinction In Every Note, Integrity In Every Detail.
        </p>
      </div>
    </main>
  );
};

export default Refund;