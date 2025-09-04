import React from "react";
import ProductCard from "./ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/type";

interface Props{
  title: string
}

const ProductSection = async ({title}: Props) => {

  const products = await getProducts();
  // console.log(products);

  return (
    <section id="product_section" className="main-max-width padding-x mx-auto my-20">
      <SectionHeader 
        title={title}
        subtitle="Discover our carefully curated collection of premium products designed to enhance your lifestyle"
      />

      {/* Content */}
      <div className="flex-center flex-wrap gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
