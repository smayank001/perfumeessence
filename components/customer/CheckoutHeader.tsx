import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CheckoutHeader = () => {
  return (
    <header className='flex items-center justify-center py-5 border-b bg-white'>
      <Link href={"/"} className="flex items-center justify-center">
        <Image src={"/Images/logo.png"} alt='THE PERFUME ESSENCE logo' width={120} height={120} className="object-contain h-12 w-auto rounded-sm shadow-sm" priority />
      </Link>
    </header>
  )
}

export default CheckoutHeader
