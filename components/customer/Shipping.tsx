"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Clock, PhoneCall, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

const shippingSteps = [
  {
    title: "1. Order Verification",
    desc: "Every bespoke order is verified via SMS or a discrete confirmation call to ensure flawless delivery details.",
    icon: <PhoneCall size={20} className="text-[#C8A45D]" />,
  },
  {
    title: "2. Atelier Compounding & Inspection",
    desc: "Your chosen fragrances and accessories undergo meticulous quality review and velvet packaging within 24–48 hours.",
    icon: <ShieldCheck size={20} className="text-[#C8A45D]" />,
  },
  {
    title: "3. Insured Express Delivery",
    desc: "Our premium courier partners deliver your parcel directly to your doorstep in 2 to 4 business days nationwide.",
    icon: <Truck size={20} className="text-[#C8A45D]" />,
  },
];

const Shipping = () => {
  return (
    <main className="bg-[#F7F2E8] text-[#19151D] min-h-screen pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-12 font-serif select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="h-px w-6 bg-[#C8A45D]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#68447F] font-normal">
              LOGISTICS & FULFILLMENT
            </span>
            <span className="h-px w-6 bg-[#C8A45D]" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#21132F] font-normal tracking-tight mb-4">
            Shipping & Pan-India Delivery
          </h1>
          <p className="text-[#6E6472] max-w-lg mx-auto font-normal leading-relaxed text-sm sm:text-base">
            Every shipment from THE PERFUME ESSENCE is fully insured and packed in our signature presentation boxes.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#FFFFFF] p-8 border border-[#D8CEDA] flex items-center gap-5 shadow-sm hover:border-[#C8A45D] transition-colors">
            <div className="w-12 h-12 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center flex-shrink-0 text-[#21132F]">
              <Clock size={24} className="text-[#C8A45D]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#68447F]">Estimated Transit Time</p>
              <p className="text-lg font-normal text-[#21132F] mt-0.5">2 – 4 Business Days</p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 border border-[#D8CEDA] flex items-center gap-5 shadow-sm hover:border-[#C8A45D] transition-colors">
            <div className="w-12 h-12 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center flex-shrink-0 text-[#21132F]">
              <MapPin size={24} className="text-[#C8A45D]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#68447F]">Complimentary Delivery</p>
              <p className="text-lg font-normal text-[#21132F] mt-0.5">Orders Above ₹5,000</p>
            </div>
          </div>
        </div>

        {/* The Timeline */}
        <div className="bg-[#FFFFFF] p-8 md:p-12 border border-[#D8CEDA] shadow-sm mb-12">
          <h2 className="text-2xl font-normal text-[#21132F] mb-8 pb-3 border-b border-[#F5F0F7]">
            The Atelier Journey
          </h2>
          <div className="space-y-8">
            {shippingSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="flex gap-5 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D]/40 flex items-center justify-center z-10">
                    {step.icon}
                  </div>
                  {index !== shippingSteps.length - 1 && (
                    <div className="w-[1px] h-full bg-[#D8CEDA] absolute top-10" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-base sm:text-lg font-normal text-[#21132F] mb-1.5">{step.title}</h3>
                  <p className="text-[#6E6472] text-xs sm:text-sm font-normal leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Concierge Support Callout */}
        <motion.div 
          className="bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D]/40 p-8 md:p-10 text-center shadow-xl"
        >
          <p className="text-[#DCC7A3] text-[10px] uppercase tracking-[0.25em] mb-2">Need Shipment Assistance?</p>
          <h3 className="text-2xl sm:text-3xl text-[#F7F2E8] font-normal mb-6">Our Concierge Is At Your Service</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact-information"
              className="btn-luxury-primary !bg-[#C8A45D] !text-[#19151D] hover:!bg-[#DCC7A3]"
            >
              <span>Contact Fragrance Concierge</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default Shipping;