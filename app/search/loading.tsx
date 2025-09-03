import React from 'react'
import ProductCardSkeleton from '@/components/home/ProductCardSkeleton'

const SearchLoading = () => {
  return (
    <div className='min-max-width mx-auto padding-x py-9'>
      <div className='h-6 w-64 bg-gray-200 rounded animate-pulse mx-auto' />

      <div className='flex-center flex-wrap my-9 gap-4'>
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}

export default SearchLoading


