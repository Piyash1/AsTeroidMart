"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { signOutUser } from "@/lib/actions";
import { useCart } from "@/context/CartContext";

interface Props {
  mobile?: boolean;
  loggedInUser?: {
    name: string;
    email: string;
    image: string;
  };
}

const NavItems = ({ mobile, loggedInUser }: Props) => {
  const { cartItemsCount, cartCode } = useCart();

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        mobile ? "flex-col gap-6" : "flex-row"
      )}
    >
      {loggedInUser ? (
        <>
          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
              {loggedInUser.image ? (
                <Image
                  src={loggedInUser.image}
                  alt="profile pic"
                  className="object-cover"
                  fill
                  unoptimized={true}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm"
                style={{ display: loggedInUser.image ? 'none' : 'flex' }}
              >
                {loggedInUser.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>

            <Link
              href="/profile"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 hidden sm:block"
            >
              {loggedInUser.name || "User"}
            </Link>
          </div>

          {/* Logout Button */}
          <form action={signOutUser}>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 
                       border border-gray-300 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <Link 
          href="/signin" 
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                   border border-blue-600 rounded-lg transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </Link>
      )}

      {/* Cart Icon */}
      <Link href={`/cart/${cartCode || ''}`} className="relative group">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 group-hover:scale-105">
          <FaShoppingCart className="text-xl text-gray-700 group-hover:text-gray-900" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {cartItemsCount > 99 ? '99+' : cartItemsCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default NavItems;
