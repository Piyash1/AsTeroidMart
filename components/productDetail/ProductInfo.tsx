"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../uiComponents/Button";
import { ProductDetail } from "@/lib/type";
import { MEDIA_BASE_URL, api, checkProductInCart } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { addToCartAction, addToWishlistAction } from "@/lib/actions";
import { toast } from "react-toastify";
import WishlistTooltip from "../uiComponents/WishlistTooltip";

const ProductInfo = ({
  product,
  loggedInUserEmail,
}: {
  product: ProductDetail;
  loggedInUserEmail: string | null | undefined;
}) => {
  const { cartCode, refreshCartStats } = useCart();
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [addToWishlistLoader, setAddToWishlistLoader] = useState(false);

  // Check if product is already in cart when component mounts
  useEffect(() => {
    const checkIfInCart = async () => {
      if (cartCode && product.id) {
        try {
          const response = await checkProductInCart(cartCode, product.id);
          if (response && response.product_in_cart) {
            setAddedToCart(true);
          }
        } catch (error) {
          console.error("Error checking if product is in cart:", error);
          // Don't set addedToCart to true on error, let user try again
        }
      }
    };

    checkIfInCart();
  }, [cartCode, product.id]);

  async function handleAddToCart() {
    if (!cartCode) {
      toast.error("Cart not available");
      return;
    }

    setAddToCartLoader(true);
    const formData = new FormData();
    formData.set("cart_code", cartCode);
    formData.set("product_id", product.id.toString());

    try {
      const response = await addToCartAction(formData);
      setAddedToCart(true);
      // Refresh cart stats to update the cart count
      await refreshCartStats();
      toast.success("Product added to cart successfully");
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setAddToCartLoader(false);
    }
  }

  async function handleAddToWishlist() {
    setAddToWishlistLoader(true);
    const formData = new FormData();
    formData.set("email", loggedInUserEmail ? loggedInUserEmail : "");
    formData.set("product_id", product.id.toString());

    try {
      const response = await addToWishlistAction(formData);
      
      // Toggle the wishlist state based on the response
      if (response && response.action) {
        if (response.action === "added") {
          setAddedToWishlist(true);
          toast.success(response.message || "Product added to wishlist successfully");
        } else if (response.action === "removed") {
          setAddedToWishlist(false);
          toast.success(response.message || "Product removed from wishlist successfully");
        }
      } else {
        // Fallback: toggle the state if response format is unexpected
        setAddedToWishlist((curr) => !curr);
        toast.success("Wishlist updated successfully");
      }
      
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setAddToWishlistLoader(false);
    }
  }

  useEffect(() => {

    async function handleProductInWishlist() {
      if(loggedInUserEmail) {
        try {
          const response = await api.get(`product_in_wishlist?email=${loggedInUserEmail}&product_id=${product.id}`)
          setAddedToWishlist(response.data.product_in_wishlist)
          return response.data
        }
        catch(err: unknown) {
          if(err instanceof Error) {
            throw new Error(err.message)
          }
          throw new Error("An unknown error occurred")
        }
      }
    }
    handleProductInWishlist()

  }, [loggedInUserEmail, product.id])

  return (
    <div className="bg-white padding-x py-16 main-max-width mx-auto">
      <div className="flex items-start flex-wrap gap-16 max-lg:gap-12">
        {/* Product Image */}
        <div className="w-[450px] h-[500px] relative overflow-hidden rounded-3xl shadow-2xl border border-gray-100 max-lg:w-full max-lg:h-[400px]">
          <Image
            src={
              product.image
                ? product.image.startsWith("http")
                  ? product.image
                  : `${MEDIA_BASE_URL}${
                      product.image.startsWith("/") ? "" : "/"
                    }${product.image}`
                : "/placeholder.svg"
            }
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            priority
            className="object-cover rounded-3xl"
          />
          
          {/* Image overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl"></div>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col gap-8 max-w-[600px] max-lg:w-full">
          {/* Product Title and Price */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight max-lg:text-3xl">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                In Stock
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-xl mb-4 text-gray-900">Product Details</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                disabled={addToCartLoader || addedToCart}
                handleClick={handleAddToCart}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {addToCartLoader
                  ? "Adding to Cart..."
                  : addedToCart
                  ? "✓ Added to Cart"
                  : "Add to Cart"}
              </Button>

              {loggedInUserEmail ? (
                <Button 
                  disabled={addToWishlistLoader} 
                  onClick={handleAddToWishlist} 
                  className="flex-1 min-w-[200px] bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {addToWishlistLoader
                    ? "Updating..."
                    : addedToWishlist
                    ? "✓ In Wishlist"
                    : "Add to Wishlist"}
                </Button>
              ) : (
                <WishlistTooltip disabled={!Boolean(loggedInUserEmail)} />
              )}
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
