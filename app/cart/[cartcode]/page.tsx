import { auth } from "@/auth";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";
import { getCart } from "@/lib/api";
import { CartType } from "@/lib/type";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaChevronRight, FaShoppingCart } from "react-icons/fa";

export const metadata: Metadata = {
  title: 'Shopping Cart | AsteroidMart',
  description: 'Review your items and proceed to checkout at AsteroidMart',
}

const CartItemPage = async ({ params }: { params: Promise<{ cartcode: string }> }) => {

  const { cartcode } = await params;
  const cart:CartType = await getCart(cartcode);
  const cartitems = cart.cartitems;
  
  const cartitems_count = cart.cartitems.length;
  const total = cart.cart_total;

  const session = await auth();
  const loggedInUserEmail = session?.user?.email;

  const cartIcon = (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
  )

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
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>
      </div>

      {/* Cart Header */}
      <div className="main-max-width mx-auto padding-x mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
            <FaShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-lg text-gray-600">
              {cartitems_count} {cartitems_count === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>
      </div>

      {cartitems_count > 0 ? (
        <div className="main-max-width padding-x mx-auto pb-16">
          <div className="flex flex-col lg:flex-row gap-8 justify-between w-full">
            {/* Cart Items */}
            <div className="flex-1 bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                <p className="text-gray-600 mt-1">Review and update your items</p>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {cartitems.map((cartitem) => (
                  <CartItem key={cartitem.id} cartitem={cartitem} />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-[450px] w-full">
              <CartSummary total={total} loggedInUserEmail={loggedInUserEmail} />
            </div>
          </div>
        </div>
      ) : (
        <div className="main-max-width mx-auto padding-x pb-16">
          <EmptyState
            icon={cartIcon}
            title="Your Cart is Empty"
            description="Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products and fill your cart with things you love!"
            primaryAction={{
              label: "Start Shopping",
              href: "/"
            }}
            secondaryAction={{
              label: "Browse Categories",
              href: "/#product_section"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CartItemPage;
