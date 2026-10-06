import About from '@/sections/About';
import NewArrival from '@/sections/NewArrival';
import type { Metadata } from 'next';
import Gallery from '@/sections/Gallery';
import FreeComp from '@/components/customer/FreeComp';
import Hero from '@/sections/Hero';
import Heading from '@/sections/Heading';
import Collections from '@/sections/Collections';
import Script from 'next/script';
import Reviews from '@/sections/Reviews';
import ImageSection from '@/sections/ImageSection';
import FAQSection from '@/components/customer/FAQs';
import HotSeller from '@/sections/HotSeller';

export const metadata: Metadata = {
  title: 'THE PERFUME ESSENCE | Haute Parfumerie & Luxury Essentials India',
  description:
    'Shop handcrafted luxury perfumes, extrait de parfum, fine jewelry sets, rings, bracelets, and precision timepieces online in India at THE PERFUME ESSENCE. Fast insured delivery and cash on delivery available nationwide.',

  alternates: {
    canonical: '/',
  },
  keywords: [
    'THE PERFUME ESSENCE',
    'luxury perfumes India',
    'haute parfumerie India',
    'extrait de parfum India',
    'long lasting perfumes India',
    'best perfumes for men India',
    'best perfumes for women India',
    'arabic perfumes India',
    'perfume gift set India',
    'buy perfume online India',
    'buy watches online India',
    'luxury watches India',
    'jewelry online India',
    'jewelry sets India',
    'gold plated jewelry India',
    'stainless steel jewelry India',
    'free delivery India',
    'cash on delivery India',
  ],

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://theperfumeessence.com/',
    siteName: 'THE PERFUME ESSENCE',
    title: 'THE PERFUME ESSENCE – Haute Parfumerie & Luxury Essentials in India',
    description:
      'Discover handcrafted luxury perfumes, fine jewelry, and precision timepieces. Fast nationwide delivery across India.',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'THE PERFUME ESSENCE – Haute Parfumerie Atelier',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@theperfumeessence',
    creator: '@theperfumeessence',
    title: 'THE PERFUME ESSENCE – Haute Parfumerie & Luxury Essentials',
    description:
      'Shop luxury perfumes, fine jewelry, and precision timepieces online in India with fast delivery.',
    images: ['/logo.png'],
  },
};

export const revalidate = 200;

const page = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://theperfumeessence.com/#homepage',
    url: 'https://theperfumeessence.com',
    name: 'THE PERFUME ESSENCE – Haute Parfumerie & Luxury Essentials',
    description:
      'Shop handcrafted luxury perfumes, fine jewelry sets, rings, bracelets, and precision timepieces online in India.',
    inLanguage: 'en-IN',
    isPartOf: {
      '@id': 'https://theperfumeessence.com/#website',
    },
    about: {
      '@id': 'https://theperfumeessence.com/#organization',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Luxury Perfumes',
          url: 'https://theperfumeessence.com/collections/perfumes',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Signature Fragrances',
          url: 'https://theperfumeessence.com/collections/deals',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Timepieces',
          url: 'https://theperfumeessence.com/collections/watches',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'All Products',
          url: 'https://theperfumeessence.com/collections/all',
        },
      ],
    },
  };

  return (
    <main className="pt-[84px] sm:pt-[92px] md:pt-[102px] min-h-screen bg-[#F7F2E8] text-[#19151D] overflow-x-hidden">
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
  );
};

export default page;
