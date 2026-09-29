'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const SortSelect = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') ?? 'date-new-old'

  return (
    <select
      value={currentSort}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams)
        params.set('sort', e.target.value)
        router.push(`?${params.toString()}`)
      }}
      className="border outline-none text-zinc-600 text-sm border-zinc-300 py-2 px-2"
    >
      <option value="date-old-new">Dates Old to New</option>
      <option value="date-new-old">Dates New to Old</option>
      <option value="price-low-high">Price, Low to High</option>
      <option value="price-high-low">Price, High to Low</option>
    </select>
  )
}

export default SortSelect
