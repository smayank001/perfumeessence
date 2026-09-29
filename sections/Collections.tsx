'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { collections } from '@/lib/constants';
import { serif } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

const Collections = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [xRange, setXRange] = useState(["0%", "0%"]);

  useEffect(() => {
    const calculateScroll = () => {
      if (scrollRef.current) {
        // Total width of all cards combined
        const totalWidth = scrollRef.current.scrollWidth;
        // The width visible on screen
        const viewportWidth = window.innerWidth;
        
        // We only want to scroll as far as the overflow goes
        // We add a little extra (e.g., 100px) so the last card doesn't touch the edge
        const scrollDistance = totalWidth - viewportWidth + 100;
        
        // Convert that pixel distance into a negative translate value
        setXRange(["0px", `-${scrollDistance}px`]);
      }
    };

    calculateScroll();
    window.addEventListener('resize', calculateScroll);
    return () => window.removeEventListener('resize', calculateScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Use the dynamically calculated pixel values instead of percentages
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* We move the max-w-7xl inside so the container can stretch full-width for the scroll */}
        <div className="w-full">
          <div className='max-w-7xl mx-auto px-4'>
            <div className='flex justify-between items-center mt-17 md:mt-10 mb-6 sm:mb-10'>
                <h2 className={`${serif.className} text-[26px] sm:text-[42px] leading-9 sm:leading-12 italic`}>
                    Explore Our <br /> Signature Collections
                </h2>
                <Link href={"/collections/all"} className='hidden border-b pb-1 uppercase font-light text-lg md:flex gap-2 items-center'>
                  View All <FiArrowRight />
                </Link>
            </div>
          </div>

          {/* Added ref={scrollRef} and removed max-w restriction for the track container */}
          <motion.div ref={scrollRef} style={{ x }} className="flex gap-8 px-4 mb-20 md:mb-12">
            {collections.map((item) => {
              const isComingSoon = item.link !== '/collections/perfumes' && item.link !== '/collections/all' && item.link !== '/collections/deals';
              return (
                <Link 
                  key={item.name} 
                  className='group flex-shrink-0 w-[78vw] sm:w-[360px] md:w-[320px]' 
                  href={item.link}
                >
                  <article className='flex flex-col items-center'>
                    <div className="relative overflow-hidden w-full rounded-2xl bg-stone-100 shadow-md group-hover:shadow-2xl transition-all duration-500 border border-stone-200/60">
                      {isComingSoon && (
                        <span className="absolute top-3.5 right-3.5 z-10 text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-lg">
                          Coming Soon
                        </span>
                      )}
                      <Image 
                        className='h-[360px] sm:h-[400px] md:h-[440px] w-full group-hover:scale-105 transition-all duration-500 object-center object-cover' 
                        src={item.image} 
                        alt={item.name} 
                        width={400} 
                        height={440} 
                      />
                    </div>
                    <h2 className={`${serif.className} flex items-center gap-2 mt-3 text-lg sm:text-[21px] text-zinc-900 group-hover:text-amber-800 transition-colors whitespace-nowrap`}>
                      {item.name} <FiArrowUpRight className='mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </h2>
                  </article>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Collections;