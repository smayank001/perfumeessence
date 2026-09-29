import { collections } from '@/lib/constants'
import { serif } from '@/lib/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiFacebook, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className='border-t border-zinc-200 bg-white text-zinc-900'>
      <div className='max-w-7xl mx-auto px-6 py-16 md:py-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>

          {/* Brand Column */}
          <div className='space-y-6'>
            <Link href="/" className={`mb-3 inline-block`}>
              <Image src="/Images/logo.png" alt="THE PERFUME ESSENCE logo" width={140} height={140} className="object-contain h-16 w-auto rounded-sm shadow-sm" />
            </Link>
            <p className='text-zinc-500 text-sm leading-relaxed max-w-xs font-light'>
              Redefining luxury craftsmanship in India. From timeless timepieces to handcrafted jewelry, we bring elegance to your every moment.
            </p>
            <div className='flex gap-5 pt-2'>
              <Link aria-label='Instagram' href="" target='_blank' className='hover:text-amber-800 transition-colors'>
                <FiInstagram size={20} />
              </Link>
              <Link aria-label='Facebook' href="" target='_blank' className='hover:text-amber-800 transition-colors'>
                <FiFacebook size={20} />
              </Link>
            </div>
          </div>

          {/* Collections Column - High SEO Value */}
          <div className='lg:col-span-2'>
            <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold mb-8 text-zinc-800'>Collections</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>
              {collections.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className='text-[13px] font-light text-zinc-600 hover:text-zinc-900 hover:translate-x-1 transition-all'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold mb-8 text-zinc-800'>Client Services</h3>
            <nav className='flex flex-col gap-4'>
              <Link href="/contact-information" className='text-[13px] font-light text-zinc-600 hover:text-zinc-900 transition-colors'>Contact Us</Link>
              <Link href="/shipping-policy" className='text-[13px] font-light text-zinc-600 hover:text-zinc-900 transition-colors'>Shipping & Delivery</Link>
              <Link href="/return-refund-policy" className='text-[13px] font-light text-zinc-600 hover:text-zinc-900 transition-colors'>Returns & Exchanges</Link>
              <Link href="/privacy-policy" className='text-[13px] font-light text-zinc-600 hover:text-zinc-900 transition-colors'>Privacy Policy</Link>
              <Link href="/terms-service" className='text-[13px] block sm:hidden font-light text-zinc-600 hover:text-zinc-900 transition-colors'>Terms of Service</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-zinc-100 bg-zinc-50 py-8 px-3 sm:px-6'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-[11px] tracking-widest text-zinc-400 uppercase'>
          <p>&copy; {new Date().getFullYear()} THE PERFUME ESSENCE. ALL RIGHTS RESERVED.</p>
          {/*<div className='flex gap-1 sm:gap-3 md:gap-8'>
            <Link href="/terms-service" className='hover:text-zinc-900 transition-colors hidden sm:block'>Terms of Service</Link>
            <p className='block'>Designed & Developed by <Link className="italic underline font-semibold text-zinc-900" target="_blank" href="https://scrupulous.vercel.app">Scrupulous</Link></p>
          </div>*/}
        </div>
      </div>
    </footer>
  )
}

export default Footer
