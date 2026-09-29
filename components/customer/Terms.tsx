"use client";

import React from "react";
import { motion } from "framer-motion";
import { serif } from "@/lib/fonts";
import { FileText, AlertCircle, ShieldCheck, Scale, RefreshCw } from "lucide-react";
import Link from "next/link";

const terms = [
  {
    id: "01",
    title: "Pricing & Payments",
    icon: <Scale className="text-amber-700" size={24} />,
    content: "All prices on THE PERFUME ESSENCE are listed in INR. We offer multiple payment methods including Cash on Delivery (COD) for your convenience across India.",
  },
  {
    id: "02",
    title: "Order Confirmation",
    icon: <AlertCircle className="text-amber-700" size={24} />,
    content: "To ensure security and accuracy, orders are officially confirmed only after a verification call from our representative.",
  },
  {
    id: "03",
    title: "Availability & Cancellations",
    icon: <ShieldCheck className="text-amber-700" size={24} />,
    content: "We strive for accuracy, but THE PERFUME ESSENCE reserves the right to cancel orders due to stock discrepancies or pricing errors. You will be notified immediately.",
  },
  {
    id: "04",
    title: "Intellectual Property",
    icon: <FileText className="text-amber-700" size={24} />,
    content: "All content, including product photography and branding, is the property of THE PERFUME ESSENCE. Misuse or reproduction is strictly prohibited.",
  },
  {
    id: "05",
    title: "Policy Updates",
    icon: <RefreshCw className="text-amber-700" size={24} />,
    content: "THE PERFUME ESSENCE reserves the right to update these terms at any time. Continued use of our store signifies your acceptance of the updated policies.",
  },
];

const Terms = () => {
  return (
    <main className="bg-[#FCF9F6] min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-20 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block"
          >
            Legal Guidelines
          </motion.span>
          <h1 className={`${serif.className} text-5xl md:text-7xl text-[#1a1a1a] mb-6`}>
            Terms of Service
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg font-light leading-relaxed">
            By accessing THE PERFUME ESSENCE, you agree to these terms. We aim to provide a transparent and seamless shopping experience for all our customers in India.
          </p>
        </section>

        {/* Detailed Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {terms.map((term, index) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-5">
                <div className="bg-amber-50 p-4 rounded-2xl">
                  {term.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-800 tracking-widest">{term.id}</span>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a1a1a]">{term.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {term.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-gray-400 font-light italic text-center md:text-left">
            Last updated: March 2026. For questions, contact our support team.
          </p>
          <Link href="/" className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full text-[10px] tracking-widest uppercase hover:bg-ctr transition-all">
            Return to Store
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Terms;