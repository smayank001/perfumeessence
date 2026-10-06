"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    title: "WhatsApp Concierge",
    detail: "+91 (Indian Concierge Line)",
    sub: "Direct assistance with orders & perfume recommendations",
    link: "mailto:",
    icon: <MessageCircle size={24} className="text-[#C8A45D]" />,
  },
  {
    title: "Email Atelier Inquiries",
    detail: "concierge@theperfumeessence.com",
    sub: "For bespoke orders, gifting & client service",
    link: "mailto:concierge@theperfumeessence.com",
    icon: <Mail size={24} className="text-[#C8A45D]" />,
  },
  {
    title: "Direct Client Service",
    detail: "Mon - Sat, 10 AM to 8 PM IST",
    sub: "Personal fragrance & styling guidance",
    link: "mailto:",
    icon: <Phone size={24} className="text-[#C8A45D]" />,
  },
];

const Contact = () => {
  return (
    <main className="bg-[#F7F2E8] text-[#19151D] min-h-screen pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-10 font-serif select-none">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <header className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="h-px w-6 bg-[#C8A45D]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#68447F] font-normal">
              CLIENT CONCIERGE & ATELIER CARE
            </span>
            <span className="h-px w-6 bg-[#C8A45D]" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#21132F] font-normal tracking-tight mb-4">
            How May We Assist You?
          </h1>
          <p className="text-[#6E6472] max-w-2xl mx-auto font-normal leading-relaxed text-sm sm:text-base">
            Whether you are inquiring about a nocturnal fragrance extrait, seeking bespoke gift guidance, or tracking your order, our specialists are at your service.
          </p>
        </header>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-[#FFFFFF] p-8 border border-[#D8CEDA] hover:border-[#C8A45D] hover:shadow-[0_16px_36px_-12px_rgba(33,19,47,0.12)] transition-all duration-400 flex flex-col items-center text-center justify-between"
            >
              <div className="w-12 h-12 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center mb-6">
                {method.icon}
              </div>
              <div>
                <h3 className="text-xl font-normal text-[#21132F] mb-2">{method.title}</h3>
                <p className="text-sm font-medium text-[#68447F] mb-2">{method.detail}</p>
                <p className="text-[#6E6472] text-xs font-normal leading-relaxed mb-6">{method.sub}</p>
              </div>
              <a
                href={method.link}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#21132F] hover:text-[#C8A45D] transition-colors luxury-link pb-0.5"
              >
                <span>Connect Now</span>
                <ArrowRight size={13} className="text-[#C8A45D]" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Brand Values / Concierge Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#FFFFFF] p-8 md:p-12 border border-[#D8CEDA] shadow-sm">
          <div className="flex gap-5 items-start">
            <div className="bg-[#F5F0F7] border border-[#D8CEDA] p-3 flex-shrink-0 text-[#21132F]">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="text-lg font-normal text-[#21132F] mb-1.5">Swift Response Window</h4>
              <p className="text-xs sm:text-sm text-[#6E6472] font-normal leading-relaxed">
                We value your time. Our concierge team typically responds to all fragrance inquiries within <strong className="text-[#21132F]">2 to 4 business hours</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="bg-[#F5F0F7] border border-[#D8CEDA] p-3 flex-shrink-0 text-[#21132F]">
              <Globe size={22} />
            </div>
            <div>
              <h4 className="text-lg font-normal text-[#21132F] mb-1.5">Pan-India Express Logistics</h4>
              <p className="text-xs sm:text-sm text-[#6E6472] font-normal leading-relaxed">
                Serving patrons across India, including New Delhi, Mumbai, Bengaluru, Hyderabad, and nationwide with insured transit.
              </p>
            </div>
          </div>
        </div>

        {/* Return to Store Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="btn-luxury-secondary text-xs uppercase tracking-[0.2em]"
          >
            Return to Atelier Homepage
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Contact;