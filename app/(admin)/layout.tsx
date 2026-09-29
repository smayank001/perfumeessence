import AdminHeader from "@/components/admin/AdminHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Admin Panel',
    template: '%s | Admin Panel',
  },
  description: 'Restricted admin area. Authorized access only.',

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
    title: 'Admin Panel',
    description: 'Restricted admin area.',
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: 'Admin Panel',
    description: 'Restricted admin area.',
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
    
    <AdminHeader />
    {children}
    </>
  );
}
