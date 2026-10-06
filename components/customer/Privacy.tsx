"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Database, Phone, Mail } from "lucide-react";
import Link from "next/link";

const privacySections = [
  {
    title: "Data Collection & Integrity",
    desc: "We collect essential contact and delivery details solely to fulfill your luxury perfume, timepiece, and jewelry orders with absolute precision.",
    icon: <Database size={22} className="text-[#C8A45D]" />,
  },
  {
    title: "Encrypted & Secure Processing",
    desc: "Your information is protected within enterprise-grade encrypted environments. We never sell, lease, or monetize your personal data to third-party marketing entities.",
    icon: <Lock size={22} className="text-[#C8A45D]" />,
  },
  {
    title: "Transparent Usage & Order Verification",
    desc: "Data is utilized for order confirmation calls, insured dispatch logistics, and occasional private invitations to new Moon Essence collection releases.",
    icon: <Eye size={22} className="text-[#C8A45D]" />,
  },
];

const Privacy = () => {
  return (
    <main className="bg-[#F7F2E8] text-[#19151D] min-h-screen pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-12 font-serif select-none">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-3 bg-[#F5F0F7] border border-[#D8CEDA] text-[#21132F] mb-4"
          >
            <ShieldCheck size={32} className="text-[#C8A45D]" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#21132F] font-normal tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-[#68447F] uppercase tracking-[0.3em] text-[10px] sm:text-xs font-normal">
            Your Discretion & Trust, Our Commitment
          </p>
        </header>

        {/* Content Card */}
        <div className="bg-[#FFFFFF] p-8 md:p-14 border border-[#D8CEDA] shadow-sm mb-12">
          <p className="text-[#6E6472] text-sm sm:text-base leading-relaxed mb-10 font-normal text-center max-w-2xl mx-auto">
            At <strong className="text-[#21132F]">THE PERFUME ESSENCE</strong>, your privacy and discretion are paramount. This charter outlines how we safeguard your personal details when you browse and acquire pieces from our haute parfumerie atelier.
          </p>

          <div className="grid grid-cols-1 gap-8">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 border-b border-[#F5F0F7] pb-8 last:border-0"
              >
                <div className="bg-[#21132F] text-[#F7F2E8] p-3 border border-[#C8A45D]/40 shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-normal text-[#21132F] mb-1.5">{section.title}</h3>
                  <p className="text-[#6E6472] text-xs sm:text-sm font-normal leading-relaxed">
                    {section.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact/Support Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FFFFFF] p-8 border border-[#D8CEDA] shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-normal text-[#21132F] mb-1">Inquiries on Data Protection?</h4>
            <p className="text-[#6E6472] text-xs">Our client privacy officers are available to assist.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact-information" className="inline-flex items-center gap-2 bg-[#F7F2E8] border border-[#D8CEDA] px-5 py-2.5 text-xs text-[#21132F] hover:border-[#21132F] transition-colors">
              <Phone size={14} className="text-[#C8A45D]" /> Concierge Line
            </Link>
            <a href="mailto:privacy@theperfumeessence.com" className="inline-flex items-center gap-2 bg-[#F7F2E8] border border-[#D8CEDA] px-5 py-2.5 text-xs text-[#21132F] hover:border-[#21132F] transition-colors">
              <Mail size={14} className="text-[#C8A45D]" /> Email Privacy Team
            </a>
          </div>
        </div>

        <p className="text-center mt-10 text-[11px] text-[#A58AB8] font-normal uppercase tracking-widest">
          Last Updated: 2026 • THE PERFUME ESSENCE Atelier Policy
        </p>
      </div>
    </main>
  );
};

export default Privacy;
