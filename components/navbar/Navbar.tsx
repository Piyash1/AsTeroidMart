"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./SearchForm";
import NavItems from "./NavItems";
import MobileNavbar from "./MobileNavbar";
import SearchButton from "./SearchButton";


interface User {
  loggedInUser?: {
    name: string;
    email: string;
    image: string;
  }
}


const NavBar = ({loggedInUser}: User) => {
  const [showSearchForm, setShowSearchForm] = useState(false);

  const handleSearch = () => {
    setShowSearchForm((curr) => !curr);
  };

  return (
    <>
      <div className="main-max-width mx-auto padding-x py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="AsteroidMart Logo"
                fill
                className="object-contain"
                unoptimized={true}
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              AsteroidMart
            </h1>
          </Link>

          {/* Desktop Search */}
          <div className="max-lg:hidden flex-1 max-w-md mx-8">
            <SearchForm />
          </div>

          {/* Mobile Search Button */}
          <div className="max-lg:block hidden">
            <SearchButton
              handleSearch={handleSearch}
              showSearchForm={showSearchForm}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="max-md:hidden">
            <NavItems loggedInUser={loggedInUser} />
          </div>

          {/* Mobile Navigation */}
          <div className="max-md:block hidden">
            <MobileNavbar loggedInUser={loggedInUser} />
          </div>
        </div>
      </div>

      {/* Mobile Search Form */}
      {showSearchForm && (
        <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="main-max-width mx-auto padding-x py-4">
            <SearchForm />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;