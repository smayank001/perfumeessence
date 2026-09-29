'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { serif } from '@/lib/fonts' // Assuming your serif font is imported here

const Heading = () => {
  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  } as Variants

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  } as Variants

  const imageVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -10 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  } as Variants

  return (
    <section className="relative px-4 sm:px-6 py-0 md:py-32 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`${serif.className} text-2xl md:text-3xl lg:text-4xl leading-[1.2] md:leading-[1.1] tracking-tight text-gray-900 text-center md:text-left`}
      >
        <motion.div variants={itemVariants} className="block mb-4">
          <span className="font-semibold">THE PERFUME ESSENCE</span> redefines luxury 
        </motion.div>

        <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center md:justify-start gap-x-4">
          <span>with an exquisite collection of </span>
          <div className="relative group inline-block">
            <motion.div variants={imageVariants} className="inline-block align-middle">
              <Image 
                src="/Images/image copy 3.png" 
                alt="THE PERFUME ESSENCE luxury" 
                width={160} height={80} 
                className="object-cover w-[80px] h-[45px] md:w-[120px] md:h-[60px] rounded-full grayscale hover:grayscale-0 transition-all duration-500 border border-gray-200 shadow-xl" 
                />
            </motion.div>
          </div>
          <span className="italic font-light">haute parfumerie</span>
        </motion.div>

        <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center md:justify-start gap-x-4">
          <span className="font-normal italic">artisanal essences</span>
          <div className="relative group inline-block">
            <motion.div variants={imageVariants} className="inline-block align-middle">
              <Image 
                src="/Images/image copy 4.png" 
                alt="THE PERFUME ESSENCE fragrances" 
                width={160} height={80} 
                className="object-cover w-[80px] h-[45px] md:w-[120px] md:h-[60px] rounded-full shadow-xl" 
              />
            </motion.div>
          </div>
          <span>and luxury</span>
          <span className="underline decoration-1 underline-offset-8 decoration-ctr/30 italic">perfumes</span>
        </motion.div>

        <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center md:justify-start gap-x-3">
           <span>at India’s</span>
           <motion.div variants={imageVariants} className="inline-block align-middle">
              <Image 
                src="/Images/image copy 2.png" 
                alt="Luxury Fragrance Deals" 
                width={160} height={80} 
                className="object-cover w-[80px] h-[45px] md:w-[120px] md:h-[60px] rounded-full shadow-lg" 
              />
           </motion.div>
           <span>most coveted prices.</span>
        </motion.div>

        <motion.div variants={itemVariants} className="block mt-6 text-lg md:text-xl font-sans font-light text-gray-600 max-w-3xl leading-relaxed">
          From timeless gold-plated pieces to durable stainless steel, our curated selection serves
          <span className="text-gray-900 font-medium"> New Delhi, Bengaluru and Mumbai</span> with elegance.
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Heading