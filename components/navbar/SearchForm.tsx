import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <div className="w-full">
      <Form action="/search" scroll={false} className="relative">
        <div className="relative flex items-center">
          <input
            name="query"
            className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-500 text-gray-900 transition-all duration-200
                     hover:bg-gray-100 focus:bg-white"
            placeholder="Search products, brands, categories..."
            required
          />
          <Search className="absolute left-4 text-gray-400 size-5" />
          <button
            type="submit"
            className="absolute right-2 size-8 rounded-full bg-blue-600 hover:bg-blue-700 
                     flex justify-center items-center text-white transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Search className="size-4" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
