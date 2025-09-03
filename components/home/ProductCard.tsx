import Image from "next/image"
import { Product } from '@/lib/type'
import { MEDIA_BASE_URL } from '@/lib/api'
import Link from 'next/link'

const ProductCard = ({product}: {product: Product}) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
          
        
      <div className="w-[200px] h-[200px] rounded-md overflow-hidden">
        <Image
          src={product.image
            ? (product.image.startsWith('http')
                ? product.image
                : `${MEDIA_BASE_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`)
            : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="100%" height="100%" fill="%23f3f4f6"/></svg>'}
          className='object-cover w-full h-full'
          width={200}
          height={200}
          alt={product.name}
        />
      </div>

      {/* Product Name */}
      <p className="text-center text-lg font-semibold text-gray-800">{product.name}</p>

      {/* Product Price */}
      <p className="text-[18px] text-center font-bold text-black">${product.price}</p>

      </div>
    </Link>
  )
}

export default ProductCard