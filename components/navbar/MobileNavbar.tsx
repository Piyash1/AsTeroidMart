import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { FaHamburger } from "react-icons/fa";
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
        <SheetTrigger>
          <FaHamburger className="text-3xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="bg-white text-gray-900">
          <SheetHeader>
            <SheetTitle className="text-center font-bold text-xl">
              AsteroidMart
            </SheetTitle>
          </SheetHeader>
  
          <NavItems mobile loggedInUser={loggedInUser} />
  
          {/* <SheetClose className="overflow-y-auto">
            <NavItems mobile />
          </SheetClose> */}
        </SheetContent>
      </Sheet>
    );
  };
  
  export default MobileNavbar;