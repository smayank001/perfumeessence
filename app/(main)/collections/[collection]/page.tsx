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
    <main className="pt-28 md:pt-36 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto font-serif">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BreadCrumps collection={collection} />

      <div className="my-8 pb-6 border-b border-[#D8CEDA]">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] block mb-1 font-normal">
          CURATED DIRECTORY
        </span>
        <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl text-[#21132F] font-normal tracking-tight">
          {categoryTitle}
        </h1>
        {desc?.description && (
          <p className="mt-2 text-[#6E6472] max-w-3xl leading-relaxed text-xs sm:text-sm font-normal">
            {desc.description}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <section className="my-12 py-16 px-6 bg-[#FFFFFF] border border-[#D8CEDA] text-center max-w-2xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F5F0F7] border border-[#D8CEDA] text-[#C8A45D] text-[10px] uppercase tracking-[0.25em] mb-6">
            <FiClock className="w-3.5 h-3.5" />
            <span>Collection In Formulation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl text-[#21132F] font-normal mb-3">
            Coming Soon to the Atelier
          </h2>
          <div className="w-12 h-px bg-[#C8A45D] mx-auto mb-4" />
          <p className="text-[#6E6472] text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-8 font-normal">
            Our master artisans are currently compounding this exclusive {categoryTitle.toLowerCase()} collection. 
            Explore our ready-to-ship luxury perfumes while we prepare this release.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/collections/perfumes"
              className="btn-luxury-primary"
            >
              <span>Explore Perfumes</span>
              <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/collections"
              className="btn-luxury-secondary"
            >
              <span>All Collections</span>
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6 text-xs text-[#6E6472]">
            <div className="flex items-center gap-3">
              <label className="text-[11px] uppercase tracking-[0.16em] text-[#21132F]">Sort By:</label>
              <SortSelect />
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#A58AB8]">
              {products.length} Items
            </p>
          </div>
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6 mb-20">
            {products.map((item: productType) => (
              <CardTwo key={item._id} collectionSlug={collection} {...item} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default page;
