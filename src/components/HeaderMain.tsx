import React from 'react';
import { BiUser } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Link from 'next/link';
import SearchBar from '@/components/Searchbar';

const HeaderMain = () => {
  return (
    <header className="border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Responsive Flex Container */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Logo */}
          <Link href="/" className="w-full sm:w-auto text-center sm:text-left">
            <h1
              className="font-bold text-3xl sm:text-4xl text-gray-800 hover:text-pink-500 transition-colors duration-300 cursor-pointer"
              aria-label="Navigate to Home"
            >
              Elegancia
            </h1>
          </Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/profile" aria-label="Navigate to Profile">
              <BiUser
                className="text-gray-600 hover:text-pink-500 transition-colors duration-300 cursor-pointer"
                size={24}
              />
            </Link>

            <Link href="/cart" aria-label="Navigate to Cart">
              <HiOutlineShoppingBag
                className="text-gray-600 hover:text-pink-500 transition-colors duration-300 cursor-pointer"
                size={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
