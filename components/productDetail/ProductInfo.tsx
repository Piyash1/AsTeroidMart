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
          const response = await api.get(`/product_in_wishlist?email=${loggedInUserEmail}&product_id=${product.id}`)
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
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width padding-x mx-auto">
      {/* Product Image */}

      <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
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
          sizes="(max-width: 768px) 100vw, 350px"
          priority
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-6 max-w-[500px] max-md:w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h3 className="text-2xl font-semibold text-black">
            ${product.price}
          </h3>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-lg mb-3">Details</h3>
          <p className="text-gray-600 text-justify leading-6 text-[14px] max-md:text-[12px]">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex py-3 items-center gap-4 flex-wrap">
          <Button
            disabled={addToCartLoader || addedToCart}
            handleClick={handleAddToCart}
            className="default-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addToCartLoader
              ? "Adding to Cart..."
              : addedToCart
              ? "Added to Cart"
              : "Add to Cart"}
          </Button>

          {loggedInUserEmail ? (
            <Button disabled={addToWishlistLoader} onClick={handleAddToWishlist} className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed">
              {addToWishlistLoader
                ? "Updating Wishlist..."
                : addedToWishlist
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </Button>
          ) : (
            <WishlistTooltip disabled={!Boolean(loggedInUserEmail)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
