import ProductCard from '@/components/home/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import { productSearch } from '@/lib/api';
import { Product } from '@/lib/type';
import React from 'react'

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ query: string | null | undefined }> }) => {

    const {query} = await searchParams
    const searchProducts = await productSearch(query)
  
  const searchIcon = (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  return (
    <div className='main-max-width mx-auto padding-x py-12'>
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-lg text-gray-600">
            You searched for: <span className="font-semibold text-blue-600">"{query}"</span>
          </p>
        </div>

        {/* Results */}
        {searchProducts && searchProducts.length > 0 ? (
          <div className='flex-center flex-wrap gap-6'>
            {searchProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={searchIcon}
            title="No Products Found"
            description={`We couldn't find any products matching "${query}". Try searching with different keywords or browse our categories to discover what you're looking for.`}
            primaryAction={{
              label: "Browse All Products",
              href: "/"
            }}
            secondaryAction={{
              label: "View Categories",
              href: "/#product_section"
            }}
          />
        )}
    </div>
  )
}

export default SearchPage