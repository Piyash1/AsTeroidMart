import React from 'react'
import CategoryCard from './CategoryCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { getCategories } from '@/lib/api';
import { Category } from '@/lib/type';

const CategorySection = async () => {

  const categories = await getCategories();
  // console.log(categories);

  return (
    <section className="main-max-width padding-x mx-auto my-20">
      <SectionHeader 
        title="Browse By Category"
        subtitle="Explore our diverse range of categories to find exactly what you're looking for"
      />

      {/* Content */}
      <div className="flex justify-center flex-wrap gap-8">
        {categories.map((cat: Category) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection