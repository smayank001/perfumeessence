import Footer from "@/components/customer/Footer";
import Header from "@/components/customer/Header";
import SalesPop from "@/components/customer/SalesPop";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zevoraofficial.com'),

  title: {
    default:
      'THE PERFUME ESSENCE | Buy Watches, Jewelry & Perfumes Online in India',
    template: '%s | THE PERFUME ESSENCE',
  },

  description:
    'Shop premium watches, elegant jewelry sets, rings, bracelets, and long-lasting perfumes online in India at THE PERFUME ESSENCE. Affordable luxury accessories with fast delivery, cash on delivery, and trusted quality.',

  applicationName: 'THE PERFUME ESSENCE',

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

  authors: [{ name: 'THE PERFUME ESSENCE' }],
  creator: 'THE PERFUME ESSENCE',
  publisher: 'THE PERFUME ESSENCE',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

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

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  verification: {
    google: '6xyuGHu6tzugCE0Hl9VWsugfTJi_LGEetdaZSy3cdaY',
  },

  category: 'ecommerce',
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.zevoraofficial.com/#organization",
        "name": "THE PERFUME ESSENCE",
        "url": "https://www.zevoraofficial.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.zevoraofficial.com/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "",
          ""
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 (Indian support number to be configured)",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        }
      },

      {
        "@type": "WebSite",
        "@id": "https://www.zevoraofficial.com/#website",
        "url": "https://www.zevoraofficial.com",
        "name": "THE PERFUME ESSENCE",
        "publisher": {
          "@id": "https://www.zevoraofficial.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.zevoraofficial.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },

      {
        "@type": "WebPage",
        "@id": "https://www.zevoraofficial.com/#webpage",
        "url": "https://www.zevoraofficial.com",
        "name": "THE PERFUME ESSENCE – Watches, Jewelry & Perfumes",
        "isPartOf": {
          "@id": "https://www.zevoraofficial.com/#website"
        },
        "about": {
          "@id": "https://www.zevoraofficial.com/#organization"
        },
        "description":
          "Shop premium watches, elegant jewelry sets, rings, bracelets and long lasting perfumes online in India. Fast delivery and cash on delivery available.",
        "inLanguage": "en-IN",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.zevoraofficial.com/hero.webp"
        }
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Watches",
        "url": "https://www.zevoraofficial.com/collections/watches"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "All Products",
        "url": "https://www.zevoraofficial.com/collections/all"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Rings",
        "url": "https://www.zevoraofficial.com/collections/rings"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Collections",
        "url": "https://www.zevoraofficial.com/collections"
      }
    ]
  };

  return (
    <>
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      {children}
      <SalesPop />
      <Footer />
    </>
  );
}
