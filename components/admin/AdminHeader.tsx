'use client';

import axios from 'axios';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { FiList, FiPlusCircle, FiShoppingBag, FiStar } from 'react-icons/fi'

const AdminHeader = () => {
  const router = useRouter()
  const pathname = usePathname()

  if(pathname.includes("login")){
    return null
  }

  const handleLogout = async () => {
    const res = await axios.get('/api/logout')
    router.push("/admin-dashboard/login")
  }
  return (
    <header className='px-2 md:px-10 lg:px-16 py-5 border-b border-zinc-400'>
      <nav className='flex flex-col md:flex-row gap-y-8 justify-between items-center'>
        <div className='flex items-center gap-3 md:gap-7'>
            <Link href={"/admin-dashboard/add-product"} className='flex gap-2 items-center border border-zinc-400 px-2 md:px-4 py-1.5'>
                <FiPlusCircle />
                <span className='text-sm'>Add Product</span>
            </Link>
            <Link href={"/admin-dashboard/products-list"} className='flex gap-2 items-center border border-zinc-400 px-2 md:px-4 py-1.5'>
                <FiList />
                <span className='text-sm'>Products</span>
            </Link>
            <Link href={"/admin-dashboard/orders"} className='flex gap-2 items-center border border-zinc-400 px-2 md:px-4 py-1.5'>
                <FiShoppingBag />
                <span className='text-sm'>Orders</span>
            </Link>
            <Link href={"/admin-dashboard/media"} className='flex gap-2 items-center border border-zinc-400 px-2 md:px-4 py-1.5'>
                <FiShoppingBag />
                <span className='text-sm'>Media</span>
            </Link>
            <Link href={"/admin-dashboard/reviews"} className='flex gap-2 items-center border border-zinc-400 px-2 md:px-4 py-1.5'>
                <FiStar />
                <span className='text-sm'>Reviews</span>
            </Link>
        </div>
        <div className='flex gap-4 items-center'>
            <button className='border border-zinc-400'><Link className='px-4 text-sm py-2.5 bg-black text-white' href={"/"}>Go Home</Link></button>
            <button onClick={handleLogout} className='border border-zinc-400 py-1 cursor-pointer px-2'>Log Out</button>
        </div>
      </nav>
    </header>
  )
}

export default AdminHeader
