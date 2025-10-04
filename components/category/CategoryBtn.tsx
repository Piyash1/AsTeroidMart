"use client";

import React, { useState } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { Category } from '@/lib/type'
import { getImageUrl } from '@/lib/api'

const CategoryBtn = ({ category, isActive = false }: { category: Category; isActive?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Generate category-specific colors
  const getCategoryStyle = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    
    if (name.includes('food') || name.includes('restaurant') || name.includes('meal')) {
      return {
        gradient: 'from-orange-400 to-red-500',
        bgGradient: 'from-orange-50 to-red-50',
        iconBg: 'bg-orange-100',
        textColor: 'text-orange-700',
        activeBg: 'bg-orange-100',
        activeBorder: 'border-orange-500'
      }
    } else if (name.includes('electronics') || name.includes('tech') || name.includes('gadget')) {
      return {
        gradient: 'from-blue-400 to-indigo-500',
        bgGradient: 'from-blue-50 to-indigo-50',
        iconBg: 'bg-blue-100',
        textColor: 'text-blue-700',
        activeBg: 'bg-blue-100',
        activeBorder: 'border-blue-500'
      }
    } else if (name.includes('fashion') || name.includes('clothing') || name.includes('wear')) {
      return {
        gradient: 'from-pink-400 to-purple-500',
        bgGradient: 'from-pink-50 to-purple-50',
        iconBg: 'bg-pink-100',
        textColor: 'text-pink-700',
        activeBg: 'bg-pink-100',
        activeBorder: 'border-pink-500'
      }
    } else if (name.includes('home') || name.includes('furniture') || name.includes('decor')) {
      return {
        gradient: 'from-green-400 to-emerald-500',
        bgGradient: 'from-green-50 to-emerald-50',
        iconBg: 'bg-green-100',
        textColor: 'text-green-700',
        activeBg: 'bg-green-100',
        activeBorder: 'border-green-500'
      }
    } else if (name.includes('sports') || name.includes('fitness') || name.includes('gym')) {
      return {
        gradient: 'from-yellow-400 to-orange-500',
        bgGradient: 'from-yellow-50 to-orange-50',
        iconBg: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        activeBg: 'bg-yellow-100',
        activeBorder: 'border-yellow-500'
      }
    } else {
      return {
        gradient: 'from-gray-400 to-slate-500',
        bgGradient: 'from-gray-50 to-slate-50',
        iconBg: 'bg-gray-100',
        textColor: 'text-gray-700',
        activeBg: 'bg-gray-100',
        activeBorder: 'border-gray-500'
      }
    }
  }

  const style = getCategoryStyle(category.name)

  return (
    <Link 
      href={`/categories/${category.slug}`} 
      className={`group relative w-[200px] h-[60px] rounded-2xl flex items-center gap-4 px-4 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 ${
        isActive 
          ? `${style.activeBg} border-2 ${style.activeBorder} shadow-lg` 
          : 'bg-white border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${style.gradient} rounded-full opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-10' : ''}`}></div>
        <div className={`absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr ${style.gradient} rounded-full opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-10' : ''}`}></div>
      </div>

      {/* Icon Container */}
      <div className={`relative w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {category.image ? (
          <Image
            src={getImageUrl(category.image)}
            width={24}
            height={24}
            className="object-contain"
            alt={category.name}
          />
        ) : (
          <span className="text-lg font-bold text-gray-600">
            {category.name.charAt(0).toUpperCase()}
          </span>
        )}
        
        {/* Icon Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''}`}></div>
      </div>

      {/* Category Name */}
      <p className={`font-semibold text-sm transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'} ${
        isActive ? style.textColor : 'text-gray-800'
      }`}>
        {category.name}
      </p>
    </Link>
  )
}

export default CategoryBtn