import { collections } from '@/lib/constants'
import { serif } from '@/lib/fonts'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'All Collections — THE PERFUME ESSENCE',
  description:
    'Explore all premium collections at THE PERFUME ESSENCE — watches, gold-plated jewelry sets, stainless steel rings, bracelets, earrings, bags & luxury perfumes. Shop online in India with cash on delivery.',
  alternates: {
    canonical: 'https://www.zevoraofficial.com/collections',
  },
  keywords: [
    'the perfume essence collections',
    'watches jewelry perfumes india',
    'online accessories collections india',
    'buy jewelry watches online india',
    'fashion collections india',
    'watches in India',
    'buy watches online India',
    'jewelry online India',
    'affordable watches New Delhi',
  ],

  openGraph: {
    title: 'All Collections | Watches, Jewelry & Perfumes — THE PERFUME ESSENCE',
    description:
      'Browse all premium collections of watches, gold-plated jewelry sets, stainless steel rings, bracelets & luxury perfumes. Fast delivery across India.',
    url: 'https://www.zevoraofficial.com/collections',
    type: 'website',
    siteName: 'THE PERFUME ESSENCE',
    images: [
      {
        url: 'https://www.zevoraofficial.com/all.jpg',
        width: 1200,
        height: 630,
        alt: 'THE PERFUME ESSENCE Collections – Watches, Jewelry & Perfumes in India',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@zevoraofficial',
    creator: '@zevoraofficial',
    title: 'All Collections | Watches, Jewelry & Perfumes — THE PERFUME ESSENCE',
    description:
      'Browse premium watches, gold-plated jewelry sets, stainless steel rings & luxury perfumes. Shop online in India with cash on delivery.',
    images: ['https://www.zevoraofficial.com/all.jpg'],
  },
}

const BASE_URL = 'https://www.zevoraofficial.com'

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
        'Explore all premium collections at THE PERFUME ESSENCE including watches, jewelry sets, rings, bracelets, earrings, bags and luxury perfumes available online in India.',
      url: `${BASE_URL}/collections`,
      inLanguage: 'en-IN',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        name: 'THE PERFUME ESSENCE',
        url: `${BASE_URL}/`,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'THE PERFUME ESSENCE',
        url: `${BASE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
        },
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE_URL}/collections#itemlist`,
      name: 'THE PERFUME ESSENCE Product Collections',
      description:
        'All product collections available at THE PERFUME ESSENCE India',
      numberOfItems: collections.length,
      itemListElement: collections.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${BASE_URL}${item.link}`,
      })),
    },
  ],
}

const Page = () => {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionsJsonLd) }}
      />
      <main className='pt-35 max-w-6xl mx-auto mb-14'>
        <h1 className={`${serif.className} text-5xl mb-10 ml-10 md:ml-1`}>
          Collections
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-8'>
          {collections.map((item) => {
            const isComingSoon = item.link !== '/collections/perfumes' && item.link !== '/collections/all' && item.link !== '/collections/deals';
            return (
              <Link
                key={item.name}
                href={item.link}
                aria-label={`Shop ${item.name} collection at THE PERFUME ESSENCE`}
                className='group'
              >
                <article className='flex flex-col items-center'>
                  <div className='relative w-full overflow-hidden rounded-2xl bg-stone-100 shadow-md group-hover:shadow-2xl transition-all duration-500 border border-stone-200/60'>
                    {isComingSoon && (
                      <span className="absolute top-3.5 right-3.5 z-10 text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-lg">
                        Coming Soon
                      </span>
                    )}
                    <Image
                      className='h-[380px] w-full object-center object-cover group-hover:scale-105 transition-all duration-500'
                      src={item.image}
                      alt={`${item.name} collection — THE PERFUME ESSENCE India`}
                      width={400}
                      height={400}
                      loading='lazy'
                    />
                  </div>
                  <h2
                    className={`${serif.className} flex items-center gap-2 mt-3 text-xl text-zinc-900 group-hover:text-amber-800 transition-colors`}
                  >
                    {item.name} <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                  </h2>
                </article>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  )
}

export default Page
