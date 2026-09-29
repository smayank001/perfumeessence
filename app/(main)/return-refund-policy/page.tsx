import Refund from '@/components/customer/Return'
import { Metadata } from 'next';
import React from 'react'

export const metadata : Metadata= {
  title: "Returns & Refund Policy ",
  description: "Shop with confidence at THE PERFUME ESSENCE. Our 7-day easy return and exchange policy covers damaged or incorrect items across India. Learn about our refund process and packaging requirements.",
  alternates: {
    canonical: "/return-refund-policy",
  },
  openGraph: {
    title: "Easy 7-Day Returns | THE PERFUME ESSENCE",
    description: "Not satisfied? We offer hassle-free returns and exchanges on all unused luxury items within 7 days.",
    images: ["/logo.png"],
  },
};

const page = () => {
  return (
    <Refund />
  )
}

export default page
