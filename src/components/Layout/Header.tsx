
import Link from "next/link";
import React from "react";
const Header = () => {


  return (
    <header className="shadow-md">
      <div className="flex items-center justify-between py-4 px-6 md:px-12">
        <h2 className="primaryFont text-lg md:text-xl font-bold">
          Meal Planner
        </h2>
        <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-purple-500 text-white px-4 py-2 rounded-md secondaryFont hover:bg-purple-600 transition"
          >
            Get Started
          </Link>
        </div>

      
       <div className="md:hidden ">
          <Link
            href="/login"
            className="block bg-purple-500 text-white px-4 py-2 rounded-md secondaryFont hover:bg-purple-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>


  
    </header>
  );
};

export default Header;
