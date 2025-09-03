import ProductSection from '@/components/home/ProductSection';
import CategorySection from '@/components/home/CategorySection';
import Hero from '@/components/home/Hero';
import React, { Suspense } from 'react'
import CategorySectionSkeleton from '@/components/home/CategorySectionSkeleton';
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton';

const HomePage = () => {
  return (
    <>
      <Hero />

      <Suspense fallback={<CategorySectionSkeleton />}>
        <CategorySection />
      </Suspense>
      
      <Suspense fallback={<ProductSectionSkeleton />}>
        <ProductSection title="Featured Products" />
      </Suspense>
    </>
  )
}

export default HomePage;