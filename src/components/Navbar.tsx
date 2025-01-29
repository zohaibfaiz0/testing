'use client';
import React, { useState } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'DRESSES', href: '/Dresses' },
    { name: "TOP'S", href: '/Tops' },
    { name: 'ACCESSORIES', href: '/accessories' },
  ];

  return (
    <nav>
      {/* Desktop Menu */}
      <div className="hidden lg:block">
        <div className="container">
          <div className="flex gap-10 mx-auto font-medium py-4 text-blackish w-fit">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href} className="navbar__link relative">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="container">
          {/* Hamburger Button */}
          <div className="flex justify-end py-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl px-4"
              aria-label="Toggle menu"
            >
              <FiAlignRight />
            </button>
          </div>

          {/* Collapsible Mobile Menu */}
          {isOpen && (
            <div className="flex flex-col gap-4 mx-auto font-medium py-4 text-blackish">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.href} className="navbar__link relative">
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
