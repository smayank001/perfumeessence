import { collections } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'All Collections — THE PERFUME ESSENCE',
  description:
    'Explore all premium collections at THE PERFUME ESSENCE — luxury perfumes, gold-plated jewelry sets, stainless steel rings, bracelets, and precision timepieces. Shop online in India with cash on delivery.',
  alternates: {
    canonical: 'https://theperfumeessence.com/collections',
  },
  keywords: [
    'the perfume essence collections',
    'luxury perfumes india',
    'watches jewelry perfumes india',
    'online accessories collections india',
    'buy jewelry watches online india',
  ],

  openGraph: {
    title: 'All Collections | Haute Parfumerie & Luxury Essentials — THE PERFUME ESSENCE',
    description:
      'Browse all premium collections of perfumes, watches, gold-plated jewelry sets, and accessories. Fast delivery across India.',
    url: 'https://theperfumeessence.com/collections',
    type: 'website',
    siteName: 'THE PERFUME ESSENCE',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'THE PERFUME ESSENCE Collections',
      },
    ],
  },
};

const BASE_URL = 'https://theperfumeessence.com';

const collectionsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Collections',
          item: `${BASE_URL}/collections`,
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/collections`,
      name: 'All Collections — THE PERFUME ESSENCE',
      description:
        'Explore all premium collections at THE PERFUME ESSENCE including luxury perfumes, jewelry sets, rings, bracelets, and timepieces available online in India.',
      url: `${BASE_URL}/collections`,
      inLanguage: 'en-IN',
    },
  ],
};

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionsJsonLd) }}
      />
      <main className="pt-28 md:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 font-serif">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A45D] font-normal block mb-2">
            THE ATELIER DIRECTORY
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#21132F] font-normal tracking-tight">
            Curated Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6472] mt-3 font-normal tracking-wide leading-relaxed">
            From rare extrait de parfum blends to heirloom jewelry and precision timepieces.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {collections.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.link}
                aria-label={`Shop ${item.name} collection at THE PERFUME ESSENCE`}
                className="group block bg-[#FFFFFF] border border-[#D8CEDA] p-5 transition-all duration-500 hover:border-[#C8A45D] hover:shadow-[0_16px_36px_-12px_rgba(33,19,47,0.08)]"
              >
                <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-[#F5F0F7] mb-4">
                  <Image
                    className="h-full w-full object-center object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    src={item.image}
                    alt={`${item.name} collection — THE PERFUME ESSENCE India`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-[#F5F0F7]">
                  <h2 className="text-lg text-[#21132F] font-normal tracking-wide group-hover:text-[#C8A45D] transition-colors">
                    {item.name}
                  </h2>
                  <FiArrowUpRight className="w-4 h-4 text-[#21132F] group-hover:text-[#C8A45D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Page;
