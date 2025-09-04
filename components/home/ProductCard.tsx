"use client";

import Image from "next/image"
import { Product } from '@/lib/type'
import { MEDIA_BASE_URL } from '@/lib/api'
import Link from 'next/link'
import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa'

const ProductCard = ({product}: {product: Product}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Generate random badge for demo purposes
  const getRandomBadge = () => {
    const badges = ['New', 'Sale', 'Hot', 'Limited']
    return badges[Math.floor(Math.random() * badges.length)]
  }

  const badge = getRandomBadge()
  const isOnSale = badge === 'Sale'
  const originalPrice = isOnSale ? (product.price * 1.3).toFixed(2) : null

  return (
    <div 
      className="group relative w-[280px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`px-3 py-1 text-xs font-bold rounded-full text-white shadow-sm ${
          badge === 'New' ? 'bg-green-500' :
          badge === 'Sale' ? 'bg-red-500' :
          badge === 'Hot' ? 'bg-orange-500' :
          'bg-purple-500'
        }`}>
          {badge}
        </span>
      </div>

      {/* Wishlist Button */}
      <button 
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isWishlisted 
            ? 'bg-red-500 text-white shadow-lg' 
            : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white shadow-sm'
        }`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsWishlisted(!isWishlisted)
        }}
      >
        <FaHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image Container */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
          <Image
            src={product.image
              ? (product.image.startsWith('http')
                  ? product.image
                  : `${MEDIA_BASE_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`)
              : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="220" viewBox="0 0 280 220"><rect width="100%" height="100%" fill="%23f3f4f6"/></svg>'}
            className={`object-cover w-full h-full transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            width={280}
            height={220}
            alt={product.name}
          />
          
          {/* Image Overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>

          {/* Quick Actions */}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg">
              <FaEye className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg">
              <FaShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          {isOnSale && originalPrice && (
            <span className="text-lg text-gray-500 line-through">${originalPrice}</span>
          )}
          {isOnSale && (
            <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">
              Save {((parseFloat(originalPrice!) - product.price) / parseFloat(originalPrice!) * 100).toFixed(0)}%
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard