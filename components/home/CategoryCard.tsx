"use client";

import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { Category } from '@/lib/type'
import { getImageUrl, getCategoryDetail } from '@/lib/api'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const CategoryCard = ({cat}: {cat: Category}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [productCount, setProductCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Generate category-specific colors and gradients
  const getCategoryStyle = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    
    if (name.includes('food') || name.includes('restaurant') || name.includes('meal')) {
      return {
        gradient: 'from-orange-400 to-red-500',
        bgGradient: 'from-orange-50 to-red-50',
        iconBg: 'bg-orange-100',
        textColor: 'text-orange-700',
        hoverShadow: 'hover:shadow-orange-200'
      }
    } else if (name.includes('electronics') || name.includes('tech') || name.includes('gadget')) {
      return {
        gradient: 'from-blue-400 to-indigo-500',
        bgGradient: 'from-blue-50 to-indigo-50',
        iconBg: 'bg-blue-100',
        textColor: 'text-blue-700',
        hoverShadow: 'hover:shadow-blue-200'
      }
    } else if (name.includes('fashion') || name.includes('clothing') || name.includes('wear')) {
      return {
        gradient: 'from-pink-400 to-purple-500',
        bgGradient: 'from-pink-50 to-purple-50',
        iconBg: 'bg-pink-100',
        textColor: 'text-pink-700',
        hoverShadow: 'hover:shadow-pink-200'
      }
    } else if (name.includes('home') || name.includes('furniture') || name.includes('decor')) {
      return {
        gradient: 'from-green-400 to-emerald-500',
        bgGradient: 'from-green-50 to-emerald-50',
        iconBg: 'bg-green-100',
        textColor: 'text-green-700',
        hoverShadow: 'hover:shadow-green-200'
      }
    } else if (name.includes('sports') || name.includes('fitness') || name.includes('gym')) {
      return {
        gradient: 'from-yellow-400 to-orange-500',
        bgGradient: 'from-yellow-50 to-orange-50',
        iconBg: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        hoverShadow: 'hover:shadow-yellow-200'
      }
    } else {
      return {
        gradient: 'from-gray-400 to-slate-500',
        bgGradient: 'from-gray-50 to-slate-50',
        iconBg: 'bg-gray-100',
        textColor: 'text-gray-700',
        hoverShadow: 'hover:shadow-gray-200'
      }
    }
  }

  const style = getCategoryStyle(cat.name)
  
  // Fetch actual product count for this category
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const categoryDetail = await getCategoryDetail(cat.slug)
        setProductCount(categoryDetail.products?.length || 0)
      } catch (error) {
        console.error('Error fetching category product count:', error)
        setProductCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductCount()
  }, [cat.slug])

  return (
    <Link href={`/categories/${cat.slug}`}>
      <div 
        className={`group relative w-[240px] h-[140px] bg-gradient-to-br ${style.bgGradient} rounded-3xl flex flex-col items-center justify-center p-6 shadow-lg transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${style.hoverShadow} hover:shadow-2xl border border-white/50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${style.gradient} rounded-full opacity-10 blur-sm`}></div>
          <div className={`absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-tr ${style.gradient} rounded-full opacity-10 blur-sm`}></div>
        </div>

        {/* Category Icon */}
        <div className={`relative ${style.iconBg} p-4 rounded-2xl shadow-sm transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <Image
            src={getImageUrl(cat.image)}
            alt={cat.name}
            width={32}
            height={32}
            className="transition-transform duration-300"
          />
          
          {/* Icon Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-2xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''}`}></div>
        </div>

        {/* Category Name */}
        <h3 className={`font-bold text-lg ${style.textColor} mt-3 text-center transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
          {cat.name}
        </h3>

        {/* Product Count */}
        <div className={`flex items-center gap-1 mt-1 ${style.textColor} opacity-70 transition-all duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <span className="text-sm font-medium">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              `${productCount || 0} ${productCount === 1 ? 'product' : 'products'}`
            )}
          </span>
          <FaArrowRight className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-3xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-5' : ''}`}></div>
      </div>
    </Link>
  )
}

export default CategoryCard