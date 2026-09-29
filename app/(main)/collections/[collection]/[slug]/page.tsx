import MetaViewContent from '@/components/admin/MetaViewContent';
import AddToCartButton from '@/components/customer/AddToCartButton';
import BreadCrumps from '@/components/customer/BreadCrumps';
import CardTwo from '@/components/customer/CardTwo';
import Images from '@/components/customer/Images';
import SaleTimer from '@/components/customer/SaleTimer'; // NEW IMPORT
import { connectDB } from '@/lib/config/database';
import { serif } from '@/lib/fonts';
import ProductSchema from '@/lib/models/ProductSchema';
import { productType } from '@/type';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const isDatabaseConnected = await connectDB();
  const { slug } = await params;

  const product = isDatabaseConnected
    ? await ProductSchema.findOne({ slug }).lean()
    : null;

  if (!product) {
    return {
      title: 'Product Not Found | THE PERFUME ESSENCE',
      description: 'This product could not be found.',
    };
  }

  const ogImage = product.images?.[0] || '/logo.png';

  return {
    title: product.name + ' | Buy Online in India',
    description: product.description?.slice(0, 160),
    alternates: {
      canonical: `/collections/${product.category}/${product.slug}`,
    },
    keywords: product.keywords,
    openGraph: {
      title: `${product.name} | THE PERFUME ESSENCE`,
      description: product.description?.slice(0, 160),
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      images: [ogImage],
    },
  };
}

export const generateStaticParams = async () => {
  const isDatabaseConnected = await connectDB()

  if (!isDatabaseConnected) {
    return []
  }

  const res = await ProductSchema.find({}).lean()

  return res.map((item: productType) => ({
    slug: item.slug
  }))
}

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const isDatabaseConnected = await connectDB();
  const { slug } = await params;

  const product = isDatabaseConnected
    ? await ProductSchema.findOne({ slug }).lean()
    : null;

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-medium">Product Not Found</h1>
      </main>
    );
  }

  const productClient = JSON.parse(JSON.stringify(product))

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.zevoraofficial.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.category,
        "item": `https://www.zevoraofficial.com/collections/${product.category}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://www.zevoraofficial.com/collections/${product.category}/${product.slug}`,
      },
    ],
  };

  const currentPrice = product.onSale ? product.salePrice : product.price;

const offers = product.hasVariants
  ? product.variants.map((v: any) => ({
      "@type": "Offer",
      "sku": v.sku,
      "price": currentPrice,
      "priceCurrency": "INR",
      "availability": v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://www.zevoraofficial.com/collections/${product.category}/${product.slug}`,
    }))
  : {
      "@type": "Offer",
      "price": currentPrice,
      "priceCurrency": "INR",
      "availability": product.variants[0]?.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://www.zevoraofficial.com/collections/${product.category}/${product.slug}`,
    };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "image": product.images,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "THE PERFUME ESSENCE"
  },
  "keywords": product.keywords.join(", "),
  "offers": offers,
  ...(product.fragranceType && { "additionalProperty": [{
    "@type": "PropertyValue",
    "name": "Fragrance Type",
    "value": product.fragranceType
  }]})
};


  const relatedProducts = await ProductSchema.aggregate([
    {
      $match: {
        category: product.category,
        _id: { $ne: product._id },
      },
    },
    { $sample: { size: 8 } },
  ]);


  return (
  <main className="pt-19 lg:pt-25 pb-20 px-2 md:px-6 lg:px-12 max-w-[1400px] mx-auto ">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />


      <MetaViewContent
        productId={product._id.toString()}
        name={product.name}
        price={product.price}
        salePrice={product.salePrice}
        onSale={product.onSale}
      />

      <BreadCrumps collection={product.category} product={product.name} />

    <section className="grid px-3 md:px-0 grid-cols-1 lg:grid-cols-11 gap-16 lg:gap-24">

      <div className="lg:col-span-6">
        <div className="bg-stone-50 rounded-sm overflow-hidden">
          <Images images={product.images} name={product.name} />
        </div>
      </div>

      {/* Right: Product Details (Takes 5 columns) */}
      <div className="lg:col-span-5 relative">
        <div className="sticky top-32 flex flex-col gap-8">

          {/* Header */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Fine <Link className="italic text-stone-800 underline" href={`/collections/${product.category}`}>{product.category}</Link> Collection
            </p>
            <h1 className={`${serif.className} text-4xl lg:text-5xl leading-tight text-zinc-900`}>
              {product.name}
            </h1>
          </div>

          {/* Pricing - Refined */}
          <div className="flex items-baseline gap-4 border-b border-stone-200 pb-5">
            {product.hasVariants && product.variants?.length > 1 ? (
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium text-zinc-900">
                  INR 799 – INR 1,499
                </span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">
                  (50 ml / 100 ml)
                </span>
              </div>
            ) : (
              <>
                <span className={`text-2xl font-light tracking-tight ${product.onSale ? 'text-stone-400 line-through text-lg' : 'text-zinc-900'}`}>
                  INR {product.price.toLocaleString()}
                </span>
                {product.onSale && product.salePrice && (
                  <span className="text-2xl font-medium text-ctr">
                    INR {product.salePrice.toLocaleString()}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Product Specifics (e.g. Perfume or Jewelry specs) */}
          <div className="space-y-3 py-2">
            {product.category.includes('perfume') && (
              <div className="grid grid-cols-2 gap-4 text-[13px] uppercase tracking-wider text-stone-600">
                <div>
                  <span className="block text-[10px] text-stone-400 mb-1">Volume</span>
                  {product.variants?.[0]?.label}
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 mb-1">Concentration</span>
                  {product.fragranceType}
                </div>
              </div>
            )}

            {/* Added Luxury Note */}
            <p className="text-[12px] italic text-stone-500">
              * Each piece is handcrafted and may vary slightly in finish.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <AddToCartButton product={productClient} />
            <p className="text-[11px] text-center uppercase tracking-widest text-stone-400">
              Complimentary shipping on all orders
            </p>
          </div>

          {/* Sale Timer - Styled as a subtle notification */}
          {product.onSale && (
            <div className="bg-stone-100 p-4 border-l-2 border-stone-800">
              <SaleTimer />
            </div>
          )}

          {/* Description - Collapsible or minimalist */}
          <div className="pt-6 border-t border-stone-200">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-3 text-zinc-900">
              Details & Materials
            </h3>
            <p className="text-stone-700 leading-relaxed text-[15px] font-light">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Related Products Section */}
    <section className="mt-10 border-t border-stone-100 pt-20">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <h3 className={`${serif.className} text-center text-3xl text-zinc-900`}>
          Complementary Pieces
        </h3>
        <div className="h-px w-12 bg-stone-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-10">
        {relatedProducts.map((item: productType) => (
          <div key={item._id} className="group">
             <CardTwo
                collectionSlug={item.category}
                {...item}
              />
          </div>
        ))}
      </div>
    </section>
  </main>
);
};

export default Page;
