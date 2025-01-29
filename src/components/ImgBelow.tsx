import React from 'react';
import Image from 'next/image';
import { FaTruck, FaMoneyBillAlt, FaHeadset, FaTag } from 'react-icons/fa';

const ImgBelow: React.FC = () => {
  return (
    <div>
      {/* Image with Overlay Section */}
      <div className="flex justify-center items-center py-8 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="relative">
            <Image
              src="/assets/slide2.jpg"
              alt="Summer Collection"
              width={1000}
              height={350}
              priority
              placeholder="blur"
              blurDataURL="/assets/placeholder.jpg" // Replace with your actual low-res placeholder
              className="mx-auto object-cover w-full rounded-xl"
            />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-4">
              <div className="bg-white bg-opacity-80 p-6 md:p-8 rounded-lg shadow-md text-center w-full sm:w-3/4 md:w-1/2">
                <p className="text-lg md:text-xl font-bold text-accent">25% DISCOUNT</p>
                <p className="text-2xl md:text-3xl font-bold text-blackish">Summer Collection</p>
                <p className="text-gray-700 text-base md:text-xl">
                  Starting at <b>$20</b>{' '}
                  <a
                    href="#"
                    className="text-accent hover:underline transition-colors duration-300"
                  >
                    Shop Now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t-2 border-b-2 mb-6 border-gray-200">
        <div className="container py-10 mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 w-full max-w-7xl">
            {/* Feature 1 */}
            <div className="flex items-center space-x-4">
              <FaTruck className="h-8 w-8 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-blackish">Free Shipping</h3>
                <p className="text-gray-500">On orders over $100.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-center space-x-4">
              <FaMoneyBillAlt className="h-8 w-8 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-blackish">Free Refund</h3>
                <p className="text-gray-500">15-day return policy.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-center space-x-4">
              <FaHeadset className="h-8 w-8 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-blackish">Support</h3>
                <p className="text-gray-500">Call us: +0123 456 789.</p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-center space-x-4">
              <FaTag className="h-8 w-8 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium text-blackish">10% Discount</h3>
                <p className="text-gray-500">On your first order.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgBelow;
