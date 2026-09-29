"use client";

import React from "react";
import { motion } from "framer-motion";
import { serif } from "@/lib/fonts";
import { RefreshCcw, Box, Banknote, ShieldAlert, Camera, MessageSquare } from "lucide-react";

const policies = [
  {
    title: "7-Day Window",
    desc: "Request a return or exchange within 7 days of receiving your parcel.",
    icon: <RefreshCcw size={24} />,
  },
  {
    title: "Original State",
    desc: "Items must be unused, with all tags attached, and in original THE PERFUME ESSENCE packaging.",
    icon: <Box size={24} />,
  },
  {
    title: "Refund Process",
    desc: "Approved refunds are processed to your original payment method within 5-7 working days.",
    icon: <Banknote size={24} />,
  },
];

const Refund = () => {
  return (
    <main className="bg-[#FCF9F6] min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block"
          >
            Customer Assurance
          </motion.span>
          <h1 className={`${serif.className} text-5xl md:text-6xl text-[#1a1a1a] mb-6`}>
            Returns & Refunds
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
            Your satisfaction is our priority. If your luxury piece isn't perfect, we'll make it right.
          </p>
        </header>

        {/* Core Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {policies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col items-center"
            >
              <div className="bg-amber-50 p-4 rounded-2xl text-amber-800 mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Requirements & Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eligibility */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="text-red-500" />
              <h2 className={`${serif.className} text-2xl`}>Important Notes</h2>
            </div>
            <ul className="space-y-4 text-sm text-gray-600 font-light">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                Delivery charges (300 INR) are non-refundable.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                Items bought on clearance or flash sales are only eligible for exchange in case of damage.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                Refunds are issued after our team inspects the returned item.
              </li>
            </ul>
          </section>

          {/* How to initiate */}
          <section className="bg-[#1a1a1a] p-10 rounded-[2.5rem] text-white shadow-xl">
            <h2 className={`${serif.className} text-2xl mb-6`}>How to Initiate</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Camera className="text-amber-500 shrink-0" size={20} />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Take clear <span className="text-white font-medium">photos and a short video</span> of the item and packaging.
                </p>
              </div>
              <div className="flex gap-4">
                <MessageSquare className="text-amber-500 shrink-0" size={20} />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Message us on WhatsApp with your <span className="text-white font-medium">Order Number</span> and the reason for return.
                </p>
              </div>
              <button className="w-full bg-ctr/90 hover:bg-ctr text-white font-bold py-4 rounded-2xl transition-all mt-4">
                Contact Support
              </button>
            </div>
          </section>
        </div>

        {/* FAQ Schema Placeholder */}
        <p className="mt-12 text-center text-xs text-gray-400 uppercase tracking-widest">
          THE PERFUME ESSENCE — Trusted Quality, Guaranteed Satisfaction.
        </p>
      </div>
    </main>
  );
};

export default Refund;