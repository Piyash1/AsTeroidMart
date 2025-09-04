import CategoryBtn from '@/components/category/CategoryBtn'
import ProductCard from '@/components/home/ProductCard'
import SectionHeader from '@/components/ui/SectionHeader'
import EmptyState from '@/components/ui/EmptyState'
import { getCategoryDetail, getCategories } from '@/lib/api'
import { Category } from '@/lib/type'
import Link from 'next/link'
import { FaHome, FaChevronRight } from 'react-icons/fa'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryDetail(slug);
  return {
    title: `${category.name} | AsteroidMart`,
    description: `Browse ${category.name} products at AsteroidMart. Discover quality items in this category.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat: Category) => ({
    slug: cat.slug,
  }))
}

interface CategoryPageProps {
  params: { slug: string }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params
  const [category, categories] = await Promise.all([
    getCategoryDetail(slug),
    getCategories(),
  ])

  const productCount = category.products?.length || 0

  return (
    <div className='main-max-width mx-auto padding-x py-12'>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <FaHome className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <FaChevronRight className="w-3 h-3" />
        <Link href="/#product_section" className="hover:text-blue-600 transition-colors">
          Categories
        </Link>
        <FaChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-blue-600">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-lg text-gray-600">
              {productCount} {productCount === 1 ? 'product' : 'products'} available
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Browse Other Categories
        </h2>
        <div className="flex-center flex-wrap gap-4">
          {categories?.map((cat: Category) => (
            <CategoryBtn key={cat.id} category={cat} isActive={cat.slug === slug} />
          ))}
        </div>
      </div>

      {/* Products Section */}
      {productCount > 0 ? (
        <div>
          <SectionHeader 
            title={`${category.name} Products`}
            subtitle={`Discover our collection of ${category.name.toLowerCase()} products`}
          />
          <div className='flex-center flex-wrap gap-6'>
            {category.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          title="No Products Available"
          description={`We're currently working on adding more ${category.name.toLowerCase()} products. Check back soon or explore our other categories!`}
          primaryAction={{
            label: "Browse All Categories",
            href: "/#product_section"
          }}
          secondaryAction={{
            label: "Go to Home",
            href: "/"
          }}
        />
      )}
    </div>
  )
}

export default CategoryPage