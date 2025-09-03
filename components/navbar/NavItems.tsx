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
        "flex items-center justify-center gap-6",
        mobile ? "flex-col" : "flex-row"
      )}
    >
      {loggedInUser ? (
        <>
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-md relative">
            {/* Profile picture container */}
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
              className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold"
              style={{ display: loggedInUser.image ? 'none' : 'flex' }}
            >
              {loggedInUser.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>

          <Link
            href="/profile"
            className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
          >
            {loggedInUser.name || "User"}
          </Link>

          <form action={signOutUser}>
            <button type="submit" className="nav-btn">
              Logout
            </button>
          </form>
        </>
      ) : (
        <Link href="/signin" className="nav-btn">
          Login
        </Link>
      )}

      <Link href={`/cart/${cartCode || ''}`}>
        <div className="relative flex items-center justify-center h-[60px] w-[60px] cursor-pointer">
          <FaShoppingCart className="text-4xl" />
          {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 px-2 py-1 bg-black rounded-full text-white text-xs">
              {cartItemsCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default NavItems;
