"use client";

import React from "react";
import { motion } from "framer-motion";
import { serif } from "@/lib/fonts";
import { Truck, Clock, PhoneCall, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

const shippingSteps = [
  {
    title: "Order Verification",
    desc: "Every order is confirmed via a personal call within 24 hours to ensure address accuracy.",
    icon: <PhoneCall size={24} />,
  },
  {
    title: "Processing & Dispatch",
    desc: "Once confirmed, your luxury items are quality-checked and dispatched within 1-2 working days.",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "Secure Delivery",
    desc: "Our courier partners deliver to your doorstep in 3-6 working days nationwide.",
    icon: <Truck size={24} />,
  },
];

const Shipping = () => {
  return (
    <main className="bg-[#FCF9F6] min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block"
          >
            Logistics & Delivery
          </motion.span>
          <h1 className={`${serif.className} text-5xl md:text-6xl text-[#1a1a1a] mb-6`}>
            Shipping Policy
          </h1>
          <div className="h-1 w-20 bg-ctr mx-auto" />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="bg-amber-50 p-4 rounded-2xl text-amber-800">
              <Clock size={32} />
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Estimated Time</p>
              <p className="text-xl font-semibold">3 – 5 Working Days</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="bg-amber-50 p-4 rounded-2xl text-amber-800">
              <MapPin size={32} />
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Flat Shipping Fee</p>
              <p className="text-xl font-semibold">300 INR Nationwide</p>
            </div>
          </div>
        </div>

        {/* The Timeline */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-12">
          <h2 className={`${serif.className} text-3xl mb-10`}>The THE PERFUME ESSENCE Journey</h2>
          <div className="space-y-12">
            {shippingSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-6 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-[#1a1a1a] text-white p-3 rounded-full z-10">
                    {step.icon}
                  </div>
                  {index !== shippingSteps.length - 1 && (
                    <div className="w-[2px] h-full bg-gray-100 absolute top-10" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{step.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <motion.div 
          className="bg-[#1a1a1a] text-white p-10 rounded-[2.5rem] text-center"
          whileHover={{ y: -5 }}
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Need help with your shipment?</p>
          <h3 className={`${serif.className} text-2xl md:text-3xl mb-6`}>We’re here to assist you 24/7</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link href="/contact-information" className="bg-ctr/90 hover:bg-ctr px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
              <PhoneCall size={18} /> Contact Support
            </Link>
            <p className="text-gray-400">Indian +91 support number: <span className="text-white font-bold">to be configured</span></p>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default Shipping;