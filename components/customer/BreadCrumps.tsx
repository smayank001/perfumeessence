import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

type Props = {
    collection: string
    product?: string
}

const BreadCrumps = ({collection, product}: Props) => {
  return (
    <div className='flex ml-4 md:ml-0 gap-1 uppercase text-[10px] sm:text-sm text-zinc-600 items-center my-4'>
      <Link href="/">Home</Link> <FiChevronRight /> <Link href={`/collections/${collection}`}>{collection}</Link> {product && <FiChevronRight />} {product}
    </div>
  )
}

export default BreadCrumps
