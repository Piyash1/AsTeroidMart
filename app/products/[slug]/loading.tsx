import React from "react";
import { Star } from "lucide-react";

const ProductDetailLoading = () => {
  return (
    <>
      {/* Product Info Skeleton */}
      <div className="main-max-width padding-x mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Skeleton */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Product Details Skeleton */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse w-1/3"></div>
          </div>
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div className="main-max-width padding-x mx-auto">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-6"></div>
        
        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Rating Display Box Skeleton */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <div className="h-12 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-gray-200 text-gray-300" />
              ))}
            </div>
          </div>

          {/* Rating Progress Bars Skeleton */}
          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form Button Skeleton */}
        <div className="flex justify-center items-center w-full mb-5">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>

      {/* Reviews List Skeleton */}
      <div className="main-max-width mx-auto padding-x">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full bg-white shadow-lg px-6 py-6 rounded-lg flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex flex-col flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="size-5 fill-gray-200 text-gray-300" />
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Similar Products Skeleton */}
      <section className="main-max-width padding-x mx-auto my-16">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-9"></div>
        <div className="flex-center flex-wrap gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6">
              <div className="w-[200px] h-[200px] rounded-md bg-gray-200 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetailLoading;
