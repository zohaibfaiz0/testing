import React from 'react';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const HeaderTop = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="container py-2 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          {/* Social Media Icons */}
          <div className="flex gap-2 justify-center sm:justify-start w-full sm:w-auto">
            {[
              { icon: <BsFacebook />, label: 'Facebook', href: '#' },
              { icon: <BsInstagram />, label: 'Instagram', href: '#' },
              { icon: <BsTwitter />, label: 'Twitter', href: '#' },
              { icon: <BsLinkedin />, label: 'LinkedIn', href: '#' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                aria-label={item.label}
                className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-lg"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Free Shipping Message */}
          <div className="hidden sm:block text-gray-500 text-xs text-center">
            <strong>FREE SHIPPING</strong> THIS WEEK ON ORDERS OVER $50
          </div>

          {/* Currency and Language Selectors */}
          <div className="hidden sm:flex items-center gap-4">
            <select
              className="text-gray-500 text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
              name="currency"
              id="currency"
              aria-label="Select Currency"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="PKR">PKR</option>
            </select>
            <select
              className="text-gray-500 text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
              name="language"
              id="language"
              aria-label="Select Language"
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Urdu">Urdu</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
