"use client";

import { serif } from "@/lib/fonts";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, Sparkles, Award, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  { 
    text: "Complimentary Shipping", 
    icon: <Truck size={24} />, 
    desc: "Experience luxury delivered to your doorstep. Enjoy Free Shipping on all orders above INR 5,000." 
  },
  { 
    text: "Exclusive Surprise Gift", 
    icon: <Sparkles size={24} />, 
    desc: "A token of our appreciation—receive a handcrafted accessory with every order exceeding INR 5,000." 
  },
  { 
    text: "Direct-to-Consumer Luxury", 
    icon: <Award size={24} />, 
    desc: "We eliminate middleman markups to provide world-class craftsmanship at honest, direct-to-you prices." 
  },
  { 
    text: "Nationwide Express", 
    icon: <MapPin size={24} />, // Changed icon for variety
    desc: "Insured and rapid delivery reaching Mumbai, New Delhi, Bengaluru, and every corner of India." 
  },
  { 
    text: "Master Craftsmanship", 
    icon: <ShieldCheck size={24} />, 
    desc: "Every THE PERFUME ESSENCE piece is a testament to precision, using premium, tarnish-free, and skin-friendly materials." 
  },
  { 
    text: "Concierge Support", 
    icon: <Headphones size={24} />, 
    desc: "Our dedicated jewelry experts are available 24/7 to assist you with selection and styling." 
  },
];

const About = () => {
  return (
    <section className="bg-[#FCF9F6] h-full text-[#1a1a1a] py-20 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-stone-100">
      <div className="max-w-7xl flex flex-col mx-auto">
        
        {/* Header Section: SEO-Optimized Heading */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-amber-800 font-bold mb-4 block"
            >
              The THE PERFUME ESSENCE Legacy — Est. 2024
            </motion.span>
            <motion.h2
              className={`${serif.className} text-4xl sm:text-5xl md:text-[60px] leading-[1.1] font-light text-zinc-900`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Defining the New Standard of <br /> 
              <span className="italic">Luxury in India</span>
            </motion.h2>
          </div>
          
          {/* Trust Badge */}
          <motion.div 
            className="flex items-center gap-5 bg-white p-5 pr-8 rounded-full shadow-sm border border-stone-200"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-stone-900 p-3 rounded-full text-white">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-xl font-bold leading-none italic">80k+</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">Verified Experiences</p>
            </div>
          </motion.div>
        </header>

        {/* Mission Statement: The "Why Us" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.article 
            className="bg-white p-7 sm:p-10 md:p-16 rounded-[40px] border border-stone-100 flex flex-col justify-center shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className={`${serif.className} text-xl md:text-3xl tracking-tight text-zinc-800`}>
              "We believe luxury isn't a price tag it's an experience. Our mission is to democratize 
              premium watches and fine jewelry across India, blending 
              timeless aesthetics with <span className="text-amber-800">uncompromising quality</span>."
            </p>
          </motion.article>

          <motion.div 
            className="relative overflow-hidden min-h-[350px] rounded-[40px] shadow-sm group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/mission.webp" 
              alt="THE PERFUME ESSENCE luxury craftsmanship - Premium Watches and Jewelry India" 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
          </motion.div>
        </div>

        {/* Value Proposition Grid */}
        <section className="mt-12">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-stone-900">Why Connoisseurs Choose THE PERFUME ESSENCE</h3>
            <div className="h-px flex-1 bg-stone-200" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-3xl border border-stone-100 hover:border-stone-900 transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-stone-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold mb-3 text-zinc-900">
                  {feature.text}
                </h4>
                <p className="text-sm text-stone-500 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SEO Footer with Geo-Tagging */}
        <footer className="text-center border-t border-stone-200 pt-12">
          <div className="flex items-center justify-center gap-2 text-stone-400 mb-4">
            <MapPin size={14} />
            <span className="text-[11px] uppercase tracking-[0.2em]">Based in New Delhi • Shipping Nationwide</span>
          </div>
          <p className="text-stone-500 max-w-2xl mx-auto mb-10 font-light text-[15px] leading-relaxed">
            From the heart of New Delhi to the streets of Bengaluru and around the world, we are proud to be India's 
            fastest-growing luxury destination. Experience the THE PERFUME ESSENCE standard today.
          </p>
          <Link 
            href="/collections" 
            className="inline-block bg-zinc-900 text-white px-12 py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
          >
            Enter the Collection
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default About;