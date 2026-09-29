import Terms from '@/components/customer/Terms'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Terms of Service ",
  description: "Read the official terms of service for THE PERFUME ESSENCE. Information on orders, pricing in INR, shipping policies, and our commitment to luxury quality in New Delhi, Mumbai, and Bengaluru.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | THE PERFUME ESSENCE",
    description: "Legal guidelines and shopping terms for THE PERFUME ESSENCE customers.",
    images: ["/logo.png"],
  },
};

const page = () => {
  return (
    <Terms />
  )
}

export default page
