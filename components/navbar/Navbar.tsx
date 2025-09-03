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
      <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-1">
        <div className="flex justify-between items-center main-max-width mx-auto padding-x">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AsteroidMart Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-2xl font-extrabold text-gray-900">AsteroidMart</h1>
          </Link>

          <div className="max-lg:hidden">
            <SearchForm />
          </div>

          <div className="max-lg:block hidden">
            <SearchButton
              handleSearch={handleSearch}
              showSearchForm={showSearchForm}
            />
          </div>

          <div className="max-md:hidden">
            <NavItems loggedInUser={loggedInUser} />
          </div>

          <div className="max-md:block hidden">
            <MobileNavbar loggedInUser={loggedInUser} />
          </div>
        </div>
      </nav>

      {showSearchForm && (
        <div className="w-[300px] mx-auto mt-4 max-lg:block hidden">
          <SearchForm />
        </div>
      )}
    </>
  );
};

export default NavBar;