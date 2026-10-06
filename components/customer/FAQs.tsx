'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';

const faqs = [
  {
    question: 'Do you offer Cash on Delivery (COD) across India?',
    answer:
      'Yes, we offer Cash on Delivery to all major cities and pin codes across India. You only pay when your parcel is delivered to your doorstep. All shipments are fully insured and dispatched via our premium courier partners.',
  },
  {
    question: 'How long does delivery take within India?',
    answer:
      'Orders within New Delhi, Mumbai, and Bengaluru typically arrive within 2 to 3 business days. For other regions and cities, please allow 3 to 5 business days. You will receive an SMS and email with real-time tracking upon dispatch.',
  },
  {
    question: 'What is the formulation, concentration, and longevity of Moon Essence perfumes?',
    answer:
      'Our Moon Essence perfumes are compounded as Extrait de Parfum and Haute Parfumerie formulations containing high precious oil concentrations (25–35%). This ensures an intense, rich opening and a lingering sillage that lasts 12+ hours on skin and fabric.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer:
      'We offer an effortless 7-day return and exchange window for unused items in their original luxury presentation packaging. If your fragrance or accessory is not completely suited to your taste, our concierge will facilitate an exchange or refund.',
  },
  {
    question: 'Do you offer complimentary shipping?',
    answer:
      'Yes, all orders exceeding ₹5,000 qualify for complimentary insured express delivery anywhere in India. For orders below this amount, a modest standard shipping fee applies at checkout.',
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-[#E3DACD]">
      <button
        className="w-full py-6 md:py-8 flex justify-between items-center text-left transition-colors group cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg sm:text-xl md:text-2xl text-[#21152F] font-normal tracking-wide group-hover:text-[#C9A45C] transition-colors pr-4">
          {question}
        </span>
        <div className="flex-shrink-0 text-[#8B6FA8] group-hover:text-[#21152F] transition-colors">
          {isOpen ? <FiMinus className="w-5 h-5 text-[#C9A45C]" /> : <FiPlus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-[#5B5263] leading-relaxed max-w-3xl font-normal text-sm sm:text-base tracking-wide">
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative w-full bg-[#F7F3EA] py-16 md:py-28 px-4 sm:px-6 lg:px-10 font-serif">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C9A45C] font-normal block mb-2">
            CLIENT CONCIERGE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#21152F] font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5263] mt-2 font-normal tracking-wide">
            Everything you need to know about our formulations, delivery, and guarantees.
          </p>
        </div>

        {/* Minimal Accordion Rows */}
        <div className="border-t border-[#E3DACD]">
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

        {/* Concierge Contact Link */}
        <div className="mt-16 text-center pt-8 border-t border-[#E3DACD]/80">
          <p className="text-[#5B5263] text-sm font-normal mb-4">
            Require personal fragrance recommendations or bespoke gift guidance?
          </p>
          <Link
            href="/contact-information"
            className="inline-block text-xs uppercase tracking-[0.2em] text-[#21152F] hover:text-[#C9A45C] luxury-link pb-1"
          >
            Contact Fragrance Concierge
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;