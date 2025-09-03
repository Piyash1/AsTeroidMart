import { HeartOff } from "lucide-react";
import React from "react";
import { auth } from "@/auth";
import { getWishLists } from "@/lib/api";
import MiniProductCard from "./MiniProductCard";
import { WishlistType } from "@/lib/type";

const WishlistSection = async () => {
  const session = await auth();
  const email = session?.user?.email;
  const wishlists = await getWishLists(email);

  if (!wishlists || wishlists.length === 0) {
    return (
      <div className="w-full py-20 px-6 text-center bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-red-100 p-4 rounded-full shadow">
            <HeartOff className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 max-w-md">
            You haven't added any products to your wishlist yet. Start exploring
            and adding products to your wishlist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-max-width mx-auto padding-x my-10">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 max-sm:text-xl">
        Your Wishlist
      </h2>

      <div className="flex items-center w-[full] gap-4 px-6 py-6 custom-overflow border border-gray-200 rounded-lg bg-white overflow-hidden shadow-md">
        {wishlists.map((wishlist: WishlistType) => (
          <MiniProductCard key={wishlist.id} item={wishlist} />
        ))}
      </div>
    </section>
  );
};

export default WishlistSection;
