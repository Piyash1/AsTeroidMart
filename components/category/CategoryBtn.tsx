import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { Category } from '@/lib/type'
import { MEDIA_BASE_URL } from '@/lib/api'

const CategoryBtn = ({ category, isActive = false }: { category: Category; isActive?: boolean }) => {
  return (
    <Link href={`/categories/${category.slug}`} className={`cat-btn ${isActive ? 'ring-2 ring-black bg-gray-100' : ''}`}>
      {/* Icon Container */}
      <div className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm">
        {category.image ? (
          <Image
            src={category.image.startsWith('http')
              ? category.image
              : `${MEDIA_BASE_URL}${category.image.startsWith('/') ? '' : '/'}${category.image}`}
            width={30}
            height={30}
            className="object-contain"
            alt={category.name}
          />
        ) : (
          <Image
            src="/placeholder.svg"
            width={30}
            height={30}
            className="object-contain"
            alt={category.name}
          />
        )}
      </div>

      {/* Category Name */}
      <p className={`font-semibold text-[16px] ${isActive ? 'text-black' : 'text-gray-800'}`}>{category.name}</p>
    </Link>
  )
}

export default CategoryBtn