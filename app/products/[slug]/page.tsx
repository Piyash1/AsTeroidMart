import ProductSection from "@/components/home/ProductSection";
import ProductCard from "@/components/home/ProductCard";
import ProductInfo from "@/components/productDetail/ProductInfo";
import RatingProgressBar from "@/components/productDetail/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetail/ReviewCardContainer";
import ReviewForm from "@/components/productDetail/ReviewForm";
import Modal from "@/components/uiComponents/Modal";
import { Star } from "lucide-react";
import React from "react";
import { getProductDetail } from "@/lib/api";
import { auth } from "@/auth";
import Link from "next/link";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  return {
    title: `${product.name} | AsteroiDMart`,
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
    <>
      <ProductInfo product={product} loggedInUserEmail={loggedInUserEmail} />

      <div className="main-max-width padding-x mx-auto">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Customer Reviews
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Rating display box */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">{avgRating.toFixed(1)}</h1>
            <small className="text-gray-600 text-sm">of {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'} </small>

            <div className="flex gap-2">
              {stars.map((i) => {
                if (i < fullStars) {
                  return <Star key={i} className="w-5 h-5 fill-black" />
                }
                if (i === fullStars && showHalfStar) {
                  return (
                    <div key={i} className="relative w-5 h-5">
                      <Star className="w-5 h-5 fill-gray-200 text-gray-300" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                        <Star className="w-5 h-5 fill-black" />
                      </div>
                    </div>
                  )
                }
                return <Star key={i} className="w-5 h-5 fill-gray-200 text-gray-300" />
              })}
            </div>
          </div>

          {/* Rating Display Box ends */}

          {/* Rating progress bar */}

          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            <RatingProgressBar rating="Excellent" numRating={excellent} total={totalReviews} />
            <RatingProgressBar rating="Very Good" numRating={veryGood} total={totalReviews} />
            <RatingProgressBar rating="Good" numRating={good} total={totalReviews} />
            <RatingProgressBar rating="Fair" numRating={fair} total={totalReviews} />
            <RatingProgressBar rating="Poor" numRating={poor} total={totalReviews} />
          </div>

          {/* Rating progress bar ends */}
        </div>

        {/* Review modal form */}

        <div className="flex justify-center items-center w-full mb-5">
          {loggedInUser ? (
            <Modal userHaveReview={userHaveReview}>
              <ReviewForm product={product} loggedInUserEmail={loggedInUserEmail} />
            </Modal>
          ) : (
            <Link 
              href="/signin" 
              className="default-btn max-sm:text-[12px] max-sm:px-4 my-6"
            >
              Please Sign in to add a review
            </Link>
          )}
        </div>

        {/* Review modal form ends */}
      </div>

      {reviews.length > 0 && <ReviewCardContainer reviews={reviews} />}

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <section className="main-max-width padding-x mx-auto my-16">
          <h2 className="my-9 text-center text-xl font-bold text-gray-800">
            Products from the same category
          </h2>
          <div className="flex-center flex-wrap gap-4">
            {similarProducts.map((sp) => (
              <ProductCard key={sp.id} product={sp} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductPage;
