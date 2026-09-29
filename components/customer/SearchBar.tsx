'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = ({isSearchOpen}: {isSearchOpen: (searchOpen: boolean) => void}) => {

  const [query, setQuery] = useState("")
  const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      isSearchOpen(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

  return (
    <div className='w-full h-full bg-black/20 fixed inset-0 top-0'>
      <div className='bg-white flex items-center justify-center py-10'>
        <form onSubmit={handleSearch} className='border flex items-center relative w-md sm:w-lg md:w-2xl lg:w-4xl px-5'>
            <p className='absolute text-[10px] text-zinc-700 top-2 left-5'>Search</p>
            <input value={query} onChange={e => setQuery(e.target.value)} type='text' className='w-full border-none py-4 pt-6 outline-none' />
            <button type='submit'><FiSearch className='text-lg md:text-2xl cursor-pointer' /></button>
        </form>
        <FiX className='text-2xl ml-6 cursor-pointer' onClick={() => isSearchOpen(false)} />
      </div>
    </div>
  )
}

export default SearchBar
