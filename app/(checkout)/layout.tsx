import CheckoutHeader from "@/components/customer/CheckoutHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: 'Checkout page.',

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': 0,
      'max-image-preview': 'none',
      'max-video-preview': 0,
    },
  },

  referrer: 'no-referrer',

  openGraph: {
    title: 'Checkout',
    description: 'Checkout page.',
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: 'Checkout',
    description: 'Checkout page.',
  },

  other: {
    'google': 'nositelinkssearchbox',
    'googlebot-news': 'noindex',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <CheckoutHeader />
    {children}
    </>
  );
}
