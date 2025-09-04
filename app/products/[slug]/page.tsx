import ProductCard from "@/components/home/ProductCard";
import ProductInfo from "@/components/productDetail/ProductInfo";
import RatingProgressBar from "@/components/productDetail/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetail/ReviewCardContainer";
import ReviewForm from "@/components/productDetail/ReviewForm";
import SectionHeader from "@/components/ui/SectionHeader";
import Modal from "@/components/uiComponents/Modal";
import { Star } from "lucide-react";
import React from "react";
import { getProductDetail } from "@/lib/api";
import { auth } from "@/auth";
import Link from "next/link";
import { FaHome, FaChevronRight, FaTag } from "react-icons/fa";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  return {
    title: `${product.name} | AsteroidMart`,
    description: `Buy ${product.name} at AsteroidMart. ${product.description?.substring(0, 160)}...`,
  }
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  const avgRating = product?.rating?.average_rating ?? 0;
  const totalReviews = product?.rating?.total_reviews ?? 0;
  const fullStars = Math.floor(avgRating);
  const showHalfStar = avgRating - fullStars >= 0.5 && fullStars < 5;
  const stars = [0, 1, 2, 3, 4];

  const excellent = (product as any)?.excellent_review ?? 0;
  const veryGood = (product as any)?.very_good_review ?? 0;
  const good = (product as any)?.good_review ?? 0;
  const fair = (product as any)?.fair_review ?? 0;
  const poor = (product as any)?.poor_review ?? 0;

  const reviews = Array.isArray(product?.reviews) ? product.reviews : [];
  const similarProducts = Array.isArray(product?.similar_products) ? product.similar_products : [];

  const session = await auth();
  const loggedInUser = session?.user;
  const loggedInUserEmail = loggedInUser?.email;

  const userHaveReview = reviews.some((review) => review.user.email === loggedInUserEmail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Breadcrumb Navigation */}
      <div className="main-max-width mx-auto padding-x pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <FaHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <FaChevronRight className="w-3 h-3" />
          <Link href="/#product_section" className="hover:text-blue-600 transition-colors">
            Products
          </Link>
          <FaChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Info Section */}
      <ProductInfo product={product} loggedInUserEmail={loggedInUserEmail} />

      {/* Reviews Section */}
      <section className="main-max-width padding-x mx-auto py-16">
        <SectionHeader 
          title="Customer Reviews"
          subtitle={`What our customers are saying about ${product.name}`}
        />

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="w-full flex py-6 gap-8 flex-wrap items-center justify-between max-md:justify-center">
            {/* Rating display box */}
            <div className="w-[280px] h-[280px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl px-6 py-8 flex flex-col gap-4 items-center justify-center shadow-lg border border-white/50">
              <div className="text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {avgRating.toFixed(1)}
                </h1>
                <div className="flex gap-1 justify-center mt-2">
                  {stars.map((i) => {
                    if (i < fullStars) {
                      return <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    }
                    if (i === fullStars && showHalfStar) {
                      return (
                        <div key={i} className="relative w-6 h-6">
                          <Star className="w-6 h-6 fill-gray-200 text-gray-300" />
                          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      )
                    }
                    return <Star key={i} className="w-6 h-6 fill-gray-200 text-gray-300" />
                  })}
                </div>
                <p className="text-gray-600 text-lg mt-2">
                  Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>

            {/* Rating progress bars */}
            <div className="flex flex-col gap-4 w-[600px] max-md:w-full">
              <RatingProgressBar rating="Excellent" numRating={excellent} total={totalReviews} />
              <RatingProgressBar rating="Very Good" numRating={veryGood} total={totalReviews} />
              <RatingProgressBar rating="Good" numRating={good} total={totalReviews} />
              <RatingProgressBar rating="Fair" numRating={fair} total={totalReviews} />
              <RatingProgressBar rating="Poor" numRating={poor} total={totalReviews} />
            </div>
          </div>

          {/* Review form */}
          <div className="flex justify-center items-center w-full pt-6 border-t border-gray-200">
            {loggedInUser ? (
              <Modal userHaveReview={userHaveReview}>
                <ReviewForm product={product} loggedInUserEmail={loggedInUserEmail} />
              </Modal>
            ) : (
              <Link 
                href="/signin" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FaTag className="w-4 h-4" />
                Sign in to add a review
              </Link>
            )}
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 && <ReviewCardContainer reviews={reviews} />}
      </section>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="main-max-width padding-x mx-auto py-16">
          <SectionHeader 
            title="You Might Also Like"
            subtitle="Discover more products from the same category"
          />
          <div className="flex-center flex-wrap gap-6">
            {similarProducts.map((sp) => (
              <ProductCard key={sp.id} product={sp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
