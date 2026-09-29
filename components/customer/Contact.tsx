"use client";

import React from "react";
import { motion } from "framer-motion";
import { serif } from "@/lib/fonts";
import { Mail, Phone, MessageCircle, Clock, Globe, ArrowRight } from "lucide-react";

const contactMethods = [
  {
    title: "WhatsApp Support",
    detail: "+91 support number to be configured",
    sub: "Contact us for order tracking assistance",
    link: "mailto:tahamudassar811@gmail.com",
    icon: <MessageCircle size={28} className="text-green-600" />,
    color: "bg-green-50",
  },
  {
    title: "Email Inquiries",
    detail: "tahamudassar811@gmail.com",
    sub: "For business & general support",
    link: "mailto:tahamudassar811@gmail.com",
    icon: <Mail size={28} className="text-blue-600" />,
    color: "bg-blue-50",
  },
  {
    title: "Direct Call",
    detail: "+91 support number to be configured",
    sub: "Mon - Sat, 10 AM to 8 PM",
    link: "mailto:tahamudassar811@gmail.com",
    icon: <Phone size={28} className="text-amber-700" />,
    color: "bg-amber-50",
  },
];

const Contact = () => {
  return (
    <main className="bg-[#FCF9F6] min-h-screen py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block"
          >
            Connect With THE PERFUME ESSENCE
          </motion.span>
          <h1 className={`${serif.className} text-5xl md:text-7xl text-[#1a1a1a] mb-6`}>
            How can we help?
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed text-lg">
            Whether you're inquiring about a new timepiece or need assistance with an existing order, our team is dedicated to providing a premium service experience.
          </p>
        </header>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div className={`${method.color} p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{method.title}</h3>
              <p className="text-amber-800 font-semibold mb-2">{method.detail}</p>
              <p className="text-gray-400 text-sm font-light mb-6">{method.sub}</p>
              <div className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-amber-800 transition-colors">
                Contact Now <ArrowRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Brand Values / Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex gap-6 items-start">
            <div className="bg-zinc-100 p-4 rounded-full"><Clock size={24} /></div>
            <div>
              <h4 className="font-bold mb-2">Response Time</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                We value your time. Our support team typically responds to all inquiries within **2 to 4 business hours**.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-zinc-100 p-4 rounded-full"><Globe size={24} /></div>
            <div>
              <h4 className="font-bold mb-2">Nationwide Coverage</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Serving customers across India, including **New Delhi, Mumbai, Bengaluru**, and beyond.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Contact;