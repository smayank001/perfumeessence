"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, AlertCircle, ShieldCheck, Scale, RefreshCw } from "lucide-react";
import Link from "next/link";

const terms = [
  {
    id: "01",
    title: "Pricing & Currency",
    icon: <Scale className="text-[#C8A45D]" size={20} />,
    content: "All prices on THE PERFUME ESSENCE are cataloged in Indian Rupees (INR) and include applicable taxes. We offer Cash on Delivery (COD) and verified payment options across India.",
  },
  {
    id: "02",
    title: "Order Verification",
    icon: <AlertCircle className="text-[#C8A45D]" size={20} />,
    content: "To safeguard order authenticity and prevent transit discrepancies, orders are confirmed after verification by our client services team.",
  },
  {
    id: "03",
    title: "Artisanal Availability",
    icon: <ShieldCheck className="text-[#C8A45D]" size={20} />,
    content: "Due to limited batch compounding, availability may vary. In rare cases of inventory constraint, patrons are contacted immediately with priority alternatives or immediate refunds.",
  },
  {
    id: "04",
    title: "Intellectual Property",
    icon: <FileText className="text-[#C8A45D]" size={20} />,
    content: "All fragrances, photography, branding, campaign assets, and textual content are exclusive property of THE PERFUME ESSENCE. Unauthorized reproduction is strictly prohibited.",
  },
  {
    id: "05",
    title: "Atelier Policies",
    icon: <RefreshCw className="text-[#C8A45D]" size={20} />,
    content: "THE PERFUME ESSENCE maintains the right to refine these policies in alignment with standard Indian commerce standards. Continued patronage indicates agreement.",
  },
];

const Terms = () => {
  return (
    <main className="bg-[#F7F2E8] text-[#19151D] min-h-screen pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-12 font-serif select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="h-px w-6 bg-[#C8A45D]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#68447F] font-normal">
              LEGAL CHARTER & TERMS
            </span>
            <span className="h-px w-6 bg-[#C8A45D]" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#21132F] font-normal tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6E6472] max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            By shopping with THE PERFUME ESSENCE, you engage with our luxury terms designed to ensure a seamless, transparent experience.
          </p>
        </section>

        {/* Detailed Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {terms.map((term, index) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-[#FFFFFF] border border-[#D8CEDA] p-8 shadow-sm hover:border-[#C8A45D] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center flex-shrink-0">
                  {term.icon}
                </div>
                <div>
                  <span className="text-[10px] font-normal text-[#C8A45D] tracking-[0.25em] block mb-1">SECTION {term.id}</span>
                  <h3 className="text-lg font-normal mb-2 text-[#21132F]">{term.title}</h3>
                  <p className="text-[#6E6472] text-xs sm:text-sm leading-relaxed font-normal">
                    {term.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-[#D8CEDA] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[#6E6472] font-normal text-center md:text-left">
            Last updated: 2026 • THE PERFUME ESSENCE Haute Parfumerie
          </p>
          <Link
            href="/"
            className="btn-luxury-secondary text-xs uppercase tracking-[0.2em]"
          >
            Return to Store
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Terms;