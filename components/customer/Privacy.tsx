"use client";

import React from "react";
import { motion } from "framer-motion";
import { serif } from "@/lib/fonts";
import { ShieldCheck, Lock, Eye, Database, Phone, Mail } from "lucide-react";

const privacySections = [
  {
    title: "Data Collection",
    desc: "We collect essential details like your name, shipping address, and phone number solely to fulfill your luxury accessory orders.",
    icon: <Database size={24} />,
  },
  {
    title: "Secure Processing",
    desc: "Your information is stored in encrypted systems. We never sell your personal data to third-party marketing agencies.",
    icon: <Lock size={24} />,
  },
  {
    title: "Usage Transparency",
    desc: "Data is used for order verification calls, delivery logistics, and occasional updates on new THE PERFUME ESSENCE collections.",
    icon: <Eye size={24} />,
  },
];

const Privacy = () => {
  return (
    <main className="bg-[#FCF9F6] min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-amber-50 rounded-full text-amber-800 mb-6"
          >
            <ShieldCheck size={40} />
          </motion.div>
          <h1 className={`${serif.className} text-5xl md:text-6xl text-[#1a1a1a] mb-4`}>
            Privacy Policy
          </h1>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">Your Trust, Our Responsibility</p>
        </header>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-sm mb-12">
          <p className="text-gray-600 text-lg leading-relaxed mb-12 font-light text-center">
            At <strong>THE PERFUME ESSENCE</strong>, we respect your privacy. This policy outlines how we handle your information when you shop for premium watches, jewelry, and perfumes on our platform.
          </p>

          <div className="grid grid-cols-1 gap-10">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 border-b border-gray-50 pb-8 last:border-0"
              >
                <div className="bg-[#1a1a1a] text-white p-3 rounded-xl shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{section.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    {section.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact/Support Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-1">Have concerns?</h4>
            <p className="text-gray-400 text-sm">Our data protection team is here to help.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/contact-information" className="flex items-center gap-3 bg-zinc-100 px-6 py-3 rounded-full hover:bg-zinc-200 transition-all text-sm font-medium">
              <Phone size={16} className="text-amber-800" /> +91 support number to be configured
            </a>
            <a href="mailto:support@zevoraofficial.com" className="flex items-center gap-3 bg-zinc-100 px-6 py-3 rounded-full hover:bg-zinc-200 transition-all text-sm font-medium">
              <Mail size={16} className="text-amber-800" /> Email Support
            </a>
          </div>
        </div>

        <p className="text-center mt-12 text-xs text-gray-300 font-light italic">
          Last updated: March 6, 2026. Continued use of our store signifies agreement with these terms.
        </p>
      </div>
    </main>
  );
};

export default Privacy;
