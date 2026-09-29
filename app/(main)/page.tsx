import About from '@/sections/About'
import NewArrival from '@/sections/NewArrival'
import type { Metadata } from 'next'
import Gallery from '@/sections/Gallery'
import FreeComp from '@/components/customer/FreeComp'
import Hero from '@/sections/Hero'
import Heading from '@/sections/Heading'
import Collections from '@/sections/Collections'
import Script from 'next/script'
import Reviews from '@/sections/Reviews'
import ImageSection from '@/sections/ImageSection'
import FAQSection from '@/components/customer/FAQs'
import HotSeller from '@/sections/HotSeller'

export const metadata: Metadata = {
  title: 'THE PERFUME ESSENCE | Buy Watches, Jewelry & Perfumes Online in India',
  description:
    'Shop premium watches, elegant jewelry sets, rings, bracelets, and long-lasting perfumes online in India at THE PERFUME ESSENCE. Affordable luxury accessories with fast delivery, cash on delivery, and trusted quality.',

  alternates: {
    canonical: '/',
  },
  keywords: [
    // Brand
    'THE PERFUME ESSENCE',
    'THE PERFUME ESSENCE',
    'THE PERFUME ESSENCE store India',
    'THE PERFUME ESSENCE watches',
    'THE PERFUME ESSENCE jewelry',

    // Watches — high volume
    'buy watches online India',
    'watches in India',
    'best watches in India',
    'affordable watches India',
    'luxury watches India',
    'men watches India',
    'women watches India',
    'stylish watches for men India',
    'stylish watches for women India',
    'watches under 5000 rupees India',
    'watches online India cash on delivery',
    'fashion watches India',
    'watches in New Delhi',
    'watches in Mumbai',
    'watches in Bengaluru',
    'branded watches India cheap',

    // Jewelry — high volume
    'jewelry online India',
    'jewelry sets India',
    'gold plated jewelry India',
    'stainless steel jewelry India',
    'artificial jewelry India',
    'fashion jewelry India',
    'luxury jewelry India',
    'best jewelry brand India',
    'rings for women India',
    'bracelets for women India',
    'stainless steel rings India',
    'stainless steel bracelets India',
    'earrings online India',
    'stainless steel earrings India',
    'women jewelry set India',
    'bridal jewelry set India',
    'wedding jewelry India',
    'jewelry in New Delhi',
    'jewelry in Mumbai',
    'jewelry in Bengaluru',

    // Perfumes
    'perfumes online India',
    'long lasting perfumes India',
    'best perfumes for men India',
    'best perfumes for women India',
    'luxury perfumes India',
    'arabic perfumes India',
    'perfume gift set India',
    'buy perfume online India',

    // Bags
    'bags online India',
    'ladies bags India',
    'fashion bags India',
    'handbags online India',

    // Shopping intent & trust
    'buy accessories online India',
    'fashion accessories India',
    'online shopping India',
    'cash on delivery India',
    'COD online shopping India',
    'free delivery India',
    'affordable luxury India',
    'premium accessories India',
    'online store India',
  ],

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.zevoraofficial.com/',
    siteName: 'THE PERFUME ESSENCE',
    title:
      'THE PERFUME ESSENCE – Premium Watches, Jewelry & Perfumes in India',
    description:
      'Discover luxury watches, elegant jewelry sets, rings, bracelets and long-lasting perfumes. Shop premium accessories with fast delivery across India.',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'THE PERFUME ESSENCE – Premium Accessories Store',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@zevora',
    creator: '@zevora',
    title: 'THE PERFUME ESSENCE – Premium Watches, Jewelry & Perfumes',
    description:
      'Shop stylish watches, elegant jewelry and luxury perfumes online in India with fast delivery.',
    images: ['/logo.png'],
  },
}

export const revalidate = 200;

const page = () => {
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.zevoraofficial.com/#homepage",
  "url": "https://www.zevoraofficial.com",
  "name": "THE PERFUME ESSENCE – Watches, Jewelry & Perfumes",
  "description":
    "Shop premium watches, elegant jewelry sets, rings, bracelets and long lasting perfumes online in India.",
  "inLanguage": "en-IN",
  "isPartOf": {
    "@id": "https://www.zevoraofficial.com/#website"
  },
  "about": {
    "@id": "https://www.zevoraofficial.com/#organization"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Watches",
        "url": "https://www.zevoraofficial.com/collections/watches"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Rings",
        "url": "https://www.zevoraofficial.com/collections/rings"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Perfumes",
        "url": "https://www.zevoraofficial.com/collections/perfumes"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "All Products",
        "url": "https://www.zevoraofficial.com/collections/all"
      }
    ]
  }
};

  return (
    <main className='pt-20'>
      <Script
  id="homepage-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  strategy="afterInteractive"
/>
      <FreeComp />
      <Hero />
      <Heading />
      <Collections />
      <NewArrival />
      <HotSeller />
      <About />
      <ImageSection />
      <Gallery />
      <Reviews />
      <FAQSection />
    </main>
  )
}

export default page
