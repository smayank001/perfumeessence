import React from 'react'
import CardTwo from './CardTwo'
import { productType } from '@/type'

const DreamStackSecion = ({products}: {products: productType[]}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {products.map((item, index) => (
        <CardTwo key={index} collectionSlug='collections/dream-stacking' {...item} />
      ))}
    </div>
  )
}

export default DreamStackSecion
