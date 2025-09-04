import { HeartOff } from "lucide-react";
import React from "react";
import { auth } from "@/auth";
import { getWishLists } from "@/lib/api";
import MiniProductCard from "./MiniProductCard";
import { WishlistType } from "@/lib/type";
import Link from "next/link";

const WishlistSection = async () => {
  const session = await auth();
  const email = session?.user?.email;
  const wishlists = await getWishLists(email);

  if (!wishlists || wishlists.length === 0) {
    return (
      <div className="w-full py-16 px-6 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
            <HeartOff className="w-10 h-10 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-gray-600 max-w-md">
              You haven't added any products to your wishlist yet. Start exploring and adding products you love.
            </p>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Shopping</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 px-6 py-6 custom-overflow bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
        {wishlists.map((wishlist: WishlistType) => (
          <MiniProductCard key={wishlist.id} item={wishlist} />
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;
