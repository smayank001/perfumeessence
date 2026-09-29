import Shipping from '@/components/customer/Shipping'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy ",
  description: "Learn about THE PERFUME ESSENCE's fast and reliable shipping across India. Standard 300 INR delivery, 3-7 working days ETA, and secure Cash on Delivery (COD) services in New Delhi, Mumbai, and Bengaluru.",
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    title: "Fast Shipping Across India | THE PERFUME ESSENCE",
    description: "Premium watches and jewelry delivered to your doorstep in 3-7 days. Fixed 300 INR shipping fee nationwide.",
    images: ["/logo.png"],
  },
};

const page = () => {
  return (
    <Shipping />
  )
}

export default page
