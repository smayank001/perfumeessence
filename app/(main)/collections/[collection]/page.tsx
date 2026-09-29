import BreadCrumps from '@/components/customer/BreadCrumps'
import CardTwo from '@/components/customer/CardTwo'
import SortSelect from '@/components/customer/SortSelect'
import { connectDB } from '@/lib/config/database'
import { collectionMetadata } from '@/lib/constants'
import { serif } from '@/lib/fonts'
import ProductSchema from '@/lib/models/ProductSchema'
import { productType } from '@/type'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight, FiClock } from 'react-icons/fi'

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) : Promise<Metadata>{
  const { collection } = await params
  const categoryName = collection.replaceAll('-', ' ')

  const isDatabaseConnected = await connectDB()
  const sampleProduct = isDatabaseConnected
    ? await ProductSchema.findOne({ category: collection }).lean()
    : null
  const ogImage = sampleProduct?.images?.[0] || '/logo.png'
  const desc = collectionMetadata.find(item => item.slug.toLowerCase() === collection.toLowerCase())
  return {
    title: `Trending ${desc?.title || categoryName} for Women`,
    description: desc?.description,
    alternates: {
      canonical: `/collections/${collection}`,
    },
    openGraph: {
      title: `${categoryName} | THE PERFUME ESSENCE`,
      description: `Discover the best ${categoryName} products at THE PERFUME ESSENCE. Elegant designs and fast delivery.`,
      url: `/collections/${collection}`,
      type: 'website',
      siteName: 'THE PERFUME ESSENCE',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${categoryName} Collection - THE PERFUME ESSENCE`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} | THE PERFUME ESSENCE`,
      description: `Shop premium ${categoryName} products at THE PERFUME ESSENCE. Elegant designs and fast delivery.`,
      images: [ogImage],
    },
  }
}

export const generateStaticParams = async () => {
  const isDatabaseConnected = await connectDB()

  if (!isDatabaseConnected) {
    return []
  }

  const categories = await ProductSchema.distinct("category")

  return categories.map((cat: string) => ({
    collection: cat
  }))
}

const page = async ({params, searchParams}: {params: Promise<{collection: string}>, searchParams: Promise<{sort?: string}>}) => {

  const {collection} = (await params)
  const {sort} = (await searchParams)

  const isDatabaseConnected = await connectDB()

  const desc = collectionMetadata.find(item => item.slug === collection)
  const categoryTitle = desc?.title || collection.replaceAll('-', ' ')

  const sortMap: Record<string, any> = {
  'date-old-new': { createdAt: 1 },
  'date-new-old': { createdAt: -1 },
  'price-low-high': { price: 1 },
  'price-high-low': { price: -1 },
}


  const filter = collection == "all" ? {} : {category: collection}

  const sortOption = sortMap[sort ?? "date-new-old"]

  const res = isDatabaseConnected
    ? await ProductSchema.find(filter).sort(sortOption).lean()
    : []

  const products = JSON.parse(JSON.stringify(res))

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": desc?.title || collection,
  "description": desc?.description,
  "url": `https://www.zevoraofficial.com/collections/${collection}`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": products.length,
    "itemListElement": products.map((product: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.zevoraofficial.com/collections/${product.category}/${product.slug}`,
      "name": product.name,
      "image": product.images?.[0],
      // Adding price info here helps Google show a price range for the category
      "offers": {
        "@type": "Offer",
        "price": product.onSale ? product.salePrice : product.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    }))
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.zevoraofficial.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Collections",
      "item": "https://www.zevoraofficial.com/collections"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": desc?.title || collection,
      "item": `https://www.zevoraofficial.com/collections/${collection}`
    }
  ]
};

  return (
    <main className='pt-18 lg:pt-24 px-3 max-w-7xl mx-auto'>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BreadCrumps collection={collection} />

      <h1 className={`${serif.className} capitalize text-3xl sm:text-4xl my-8 mb-4`}>{categoryTitle}</h1>
      {desc?.description && <p className='mb-8 text-zinc-600 max-w-3xl leading-relaxed text-sm sm:text-base font-light'>{desc.description}</p>}

      {products.length === 0 ? (
        <section className="my-12 py-16 px-6 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 rounded-3xl border border-stone-200/80 text-center max-w-2xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-medium uppercase tracking-widest mb-6">
            <FiClock className="w-3.5 h-3.5" />
            <span>Collection In Preparation</span>
          </div>

          <h2 className={`${serif.className} text-3xl sm:text-4xl text-zinc-900 mb-4`}>
            Coming Soon...
          </h2>
          <div className="w-12 h-0.5 bg-amber-700/40 mx-auto mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto mb-8">
            Our master artisans are curating this exclusive {categoryTitle.toLowerCase()} collection. 
            Explore our ready-to-ship luxury perfumes while we prepare this drop.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/collections/perfumes"
              className="bg-zinc-900 text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-amber-900 transition-all shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <span>Explore Perfumes</span>
              <FiArrowRight />
            </Link>
            <Link
              href="/collections"
              className="border border-zinc-300 text-zinc-800 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-zinc-100 transition-all"
            >
              All Collections
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <label className="text-zinc-500 text-sm inline-block mr-4">Sort By:</label>
              <SortSelect />
            </div>
            <p className="text-sm text-zinc-500">{products.length} products</p>
          </div>
          <section className='grid gap-3 md:gap-6 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6 mb-16'>
            {products.map((item : productType) => (
              <CardTwo key={item._id} collectionSlug={collection} {...item} />
            ))}
          </section>
        </>
      )}
    </main>
  )
}

export default page
