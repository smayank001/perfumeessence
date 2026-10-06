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
    <main className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto font-serif">
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

      <section className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 my-8">
        {/* Left: Product Images (Takes 6 columns) */}
        <div className="lg:col-span-6">
          <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-2 sm:p-4 shadow-sm">
            <Images images={product.images} name={product.name} />
          </div>
        </div>

        {/* Right: Product Details (Takes 5 columns) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 flex flex-col gap-6 bg-[#FFFFFF] border border-[#D8CEDA] p-6 sm:p-8 shadow-sm">
            {/* Category / Sub-heading */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] font-normal block mb-1.5">
                MOON ESSENCE ATELIER • {product.category.replaceAll('-', ' ')}
              </span>
              <h1 className="text-3xl sm:text-4xl text-[#21132F] font-normal leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 border-b border-[#F5F0F7] pb-5">
              {product.hasVariants && product.variants?.length > 1 ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-normal text-[#21132F] tracking-wide">
                    INR 799 – INR 1,499
                  </span>
                  <span className="text-xs text-[#A58AB8] uppercase tracking-wider">
                    (50 ml / 100 ml)
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-3">
                  {product.onSale && product.salePrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-normal text-[#21132F] tracking-wide">
                        INR {product.salePrice.toLocaleString()}
                      </span>
                      <span className="text-base text-[#A58AB8] line-through font-normal">
                        INR {product.price.toLocaleString()}
                      </span>
                      <span className="px-2 py-0.5 bg-[#F5F0F7] border border-[#D8CEDA] text-[#68447F] text-[10px] uppercase tracking-widest font-sans">
                        Privilege Sale
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-normal text-[#21132F] tracking-wide">
                      INR {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Perfume Specs or Fragrance Characteristics */}
            {product.category.includes('perfume') && (
              <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-[#F5F0F7] border border-[#D8CEDA] text-xs">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#68447F] mb-0.5">
                    Standard Volume
                  </span>
                  <span className="text-[#21132F] font-medium">
                    {product.variants?.[0]?.label || '50 ml / 100 ml'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#68447F] mb-0.5">
                    Concentration
                  </span>
                  <span className="text-[#21132F] font-medium">
                    {product.fragranceType || 'Extrait de Parfum'}
                  </span>
                </div>
              </div>
            )}

            {/* Handcrafted Note */}
            <p className="text-xs italic text-[#6E6472]">
              * Hand-compounded with precious botanical essences. Longevity: 12+ hours.
            </p>

            {/* Sale Timer if on sale */}
            {product.onSale && (
              <div className="bg-[#F5F0F7] p-4 border border-[#D8CEDA]">
                <SaleTimer />
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="space-y-3 pt-2">
              <AddToCartButton product={productClient} />
              <p className="text-[11px] text-center uppercase tracking-widest text-[#6E6472]">
                Complimentary shipping across India on orders above ₹5,000
              </p>
            </div>

            {/* Details and Compounding Notes */}
            <div className="pt-6 border-t border-[#F5F0F7] space-y-3">
              <h3 className="text-xs uppercase tracking-[0.25em] text-[#21132F] font-normal">
                Notes & Formulation Details
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6472] leading-relaxed font-normal">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 md:mt-24 border-t border-[#D8CEDA] pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] block mb-2 font-normal">
              CURATED HARMONIES
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#21132F] font-normal tracking-tight">
              Complementary Pieces
            </h2>
            <div className="w-10 h-px bg-[#C8A45D] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item: productType) => (
              <CardTwo
                key={item._id}
                collectionSlug={item.category}
                {...item}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Page;
