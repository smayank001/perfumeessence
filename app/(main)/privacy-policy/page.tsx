import Privacy from '@/components/customer/Privacy'
import { Metadata } from 'next';
import React from 'react'

export const metadata : Metadata = {
  title: "Privacy Policy",
  description: "Learn how THE PERFUME ESSENCE protects your personal data. We collect only necessary information for order processing and secure delivery across India. Your privacy is our priority.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Secure Shopping at THE PERFUME ESSENCE",
    description: "Our commitment to protecting your personal information and ensuring a safe shopping experience.",
    images: ["/logo.png"],
  },
};

const page = () => {
  return (
    <Privacy />
  )
}

export default page
