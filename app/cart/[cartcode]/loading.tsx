import React from 'react';

const CartLoading = () => {
  return (
    <div className="main-max-width padding-x mx-auto py-9">
      {/* Header Skeleton */}
      <div className="h-8 bg-gray-200 rounded-lg w-32 mb-6 animate-pulse"></div>

      <div className="flex flex-wrap gap-6 lg:gap-8 justify-between w-full">
        {/* Cart Items Skeleton */}
        <div className="w-[600px] max-lg:w-full border border-gray-200 shadow-sm rounded-lg bg-white overflow-hidden flex-1">
          <div className="max-h-[400px] overflow-y-auto px-6 py-4">
            {/* Cart Item Skeleton 1 */}
            <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-gray-50 px-4 rounded-lg animate-pulse">
              {/* Product Image Skeleton */}
              <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg"></div>
              
              {/* Product Details Skeleton */}
              <div className="flex-1 min-w-[120px] space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              
              {/* Quantity Selector Skeleton */}
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-10 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
              
              {/* Price Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              
              {/* Remove Button Skeleton */}
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              
              {/* Update Button Skeleton */}
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Cart Item Skeleton 2 */}
            <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-gray-50 px-4 rounded-lg animate-pulse">
              {/* Product Image Skeleton */}
              <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg"></div>
              
              {/* Product Details Skeleton */}
              <div className="flex-1 min-w-[120px] space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              
              {/* Quantity Selector Skeleton */}
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-10 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
              
              {/* Price Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              
              {/* Remove Button Skeleton */}
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              
              {/* Update Button Skeleton */}
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Cart Item Skeleton 3 */}
            <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-gray-50 px-4 rounded-lg animate-pulse">
              {/* Product Image Skeleton */}
              <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg"></div>
              
              {/* Product Details Skeleton */}
              <div className="flex-1 min-w-[120px] space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-18"></div>
              </div>
              
              {/* Quantity Selector Skeleton */}
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-10 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
              
              {/* Price Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-18"></div>
              
              {/* Remove Button Skeleton */}
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              
              {/* Update Button Skeleton */}
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Cart Summary Skeleton */}
        <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6 animate-pulse">
          {/* Summary Header Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-40 mb-6"></div>
          
          {/* Subtotal Skeleton */}
          <div className="w-full flex items-center justify-between py-2 mb-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          
          {/* Tax Skeleton */}
          <div className="w-full flex items-center justify-between py-2 mb-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gray-300 my-4"></div>
          
          {/* Total Skeleton */}
          <div className="w-full flex items-center justify-between py-2 mb-6">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          
          {/* Checkout Button Skeleton */}
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CartLoading;

