import CategoryBtn from '@/components/category/CategoryBtn'
import ProductCard from '@/components/home/ProductCard'
import { getCategoryDetail, getCategories } from '@/lib/api'
import { Category } from '@/lib/type'


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryDetail(slug);
  return {
    title: `${category.name} | AsteroiDMart`,
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

  return (
    <div className='main-max-width mx-auto padding-x py-9'>
        <p className="font-semibold text-center">{category.name}</p>

        <div className="flex-center flex-wrap my-6 gap-4">
            {categories?.map((cat: Category) => (
              <CategoryBtn key={cat.id} category={cat} isActive={cat.slug === slug} />
            ))}
        </div>

        <div className='flex-center flex-wrap my-6 gap-4'>
            {category.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default CategoryPage