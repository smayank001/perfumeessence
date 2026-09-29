"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { serif } from "@/lib/fonts";

const faqs = [
 {
    question: "Do you offer Cash on Delivery (COD) all over India?",
    answer: "Yes, we offer Cash on Delivery to all major cities and towns across India. You only pay when the parcel reaches your doorstep. For your peace of mind, all our shipments are sent through reliable couriers like TCS and Leopards."
  },
  {
    question: "How long does delivery take within India?",
    answer: "Orders within New Delhi, Bengaluru, and Mumbai typically arrive within 2-3 business days. For other cities, please allow 4-5 business days. All shipments are insured and come with a dedicated tracking number."
  },
  {
    question: "Does my watch come with a warranty?",
    answer: "Yes, every THE PERFUME ESSENCE timepiece includes a 1-year movement warranty. This covers any internal manufacturing defects. We are committed to ensuring your timepiece performs as elegantly as it looks."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a 7-day return and exchange window for unworn items in their original packaging. Your satisfaction is our priority; if the piece isn't perfect for you, we'll make it right."
  },
 {
    question: "Do you offer Free Delivery?",
    answer: "Yes! We offer complimentary shipping across India on all orders above INR 5,000. For orders below this amount, a small standard shipping fee applies. We ensure your luxury pieces are packed securely and delivered to your doorstep at no extra cost to you."
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }: any) => {
  return (
    <div className="border-b border-stone-200">
      <button
        className="w-full py-7 flex justify-between items-center text-left transition-all group"
        onClick={onClick}
      >
        <span className={`${serif.className} text-lg sm:text-xl md:text-2xl text-zinc-900 group-hover:text-amber-800 transition-colors`}>
          {question}
        </span>
        <div className="ml-4 flex-shrink-0 text-stone-400 group-hover:text-zinc-900 transition-colors">
          {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-stone-500 leading-relaxed max-w-3xl font-light text-sm md:text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate the JSON-LD Schema for Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="bg-white pb-10 px-6 md:px-12">
      {/* Injecting the Schema into the Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="mb-16 md:mb-24 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4 block">
            Customer Care
          </span>
          <h2 className={`${serif.className} text-3xl sm:text-4xl md:text-6xl text-zinc-900`}>
            Frequently Asked <br /> Questions
          </h2>
        </header>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-stone-400 text-sm font-light mb-6">
            Still have questions? Our experts are here to help.
          </p>
          <a
            href="/contact-information"
            className="inline-block border-b border-zinc-900 pb-1 text-xs uppercase tracking-[0.2em] font-bold hover:text-amber-800 hover:border-amber-800 transition-all"
          >
            Contact Support
          </a>
        </footer>
      </div>
    </section>
  );
};

export default FAQSection;