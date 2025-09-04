import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { FaHamburger } from "react-icons/fa";
  import Link from "next/link";
  import NavItems from "./NavItems";
  
  interface Props{
    loggedInUser?:{
      name: string;
      email: string;
      image: string;
    }
  }

  const MobileNavbar = ({loggedInUser}: Props) => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <FaHamburger className="text-xl text-gray-700" />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-white text-gray-900 w-80">
          <SheetHeader className="pb-6">
            <SheetTitle className="text-center font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              AsteroidMart
            </SheetTitle>
          </SheetHeader>
  
          <div className="space-y-6">
            <NavItems mobile loggedInUser={loggedInUser} />
            
            {/* Additional Mobile Links */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <Link 
                  href="/" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Home
                </Link>
                <Link 
                  href="/#product_section" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Featured Products
                </Link>
                <Link 
                  href="/search" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Search Products
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default MobileNavbar;