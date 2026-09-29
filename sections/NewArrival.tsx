import NewArrivalsSection from '@/components/customer/NewArrivalsSection'
import { connectDB } from '@/lib/config/database'
import { serif } from '@/lib/fonts'
import ProductSchema from '@/lib/models/ProductSchema'
import Link from 'next/link'
import React from 'react'

const NewArrival = async () => {
  const isDatabaseConnected = await connectDB()

  if (!isDatabaseConnected) {
    return null
  }

  const res = await ProductSchema
    .find({})
    .sort({ createdAt: -1 }) // newest first
    .limit(12)
    .lean()

  const products = JSON.parse(JSON.stringify(res))

  if(products.length < 1){
    return null
  }

  return (
    <section className='mb-10 px-2 md:px-1'>
        <h2 className={`${serif.className} inline-block  text-black text-4xl py-8`}>
            New Arrivals
        </h2>
        <NewArrivalsSection products={products} />
        
    </section>
  )
}

export default NewArrival
