import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className='w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer'>
        {/* Image Skeleton */}
        <div className='w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-300'></div>

        {/* Product Name Skeleton */}
        <div className='w-36 h-4 bg-gray-300 rounded-md'></div>

        {/* Product Price Skeleton */}
        <div className='w-20 h-5 bg-gray-300 rounded-md'></div>
    </div>
  )
}

export default ProductCardSkeleton