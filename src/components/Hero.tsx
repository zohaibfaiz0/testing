'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlideData {
  id: number;
  image: string;
  title: string;
  mainTitle: string;
  price: string;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slideData: SlideData[] = [
    {
      id: 0,
      image: '/assets/Hero1.jpg',
      title: 'Trending Item',
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: '$20',
    },
    {
      id: 1,
      image: '/assets/Hero3.jpg',
      title: 'Trending Accessories',
      mainTitle: 'MODERN SUNGLASSES',
      price: '$15',
    },
    {
      id: 2,
      image: '/assets/Hero2.jpg',
      title: 'Sale Offer',
      mainTitle: 'NEW FASHION SUMMER SALE',
      price: '$30',
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [slideData.length]);

  const Slide: React.FC<SlideData> = ({ id, image, title, mainTitle, price }) => (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority={id === 0} // Preload only the first slide for LCP optimization
        placeholder="blur"
        blurDataURL="/assets/placeholder.jpg" // Replace with actual low-quality placeholder
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 90vw, 1400px"
        className="absolute inset-0 z-0 object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center">
        <div className="text-center text-white px-4 w-full max-w-4xl">
          {/* Small Title */}
          <h3 className="text-sm sm:text-md md:text-lg lg:text-xl mb-2 uppercase tracking-wider opacity-80">
            {title}
          </h3>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {mainTitle}
          </h1>

          {/* Price */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">
            Starting at <span className="text-yellow-400">{price}</span>
          </div>

          {/* Shop Now Button */}
          <button className="text-sm sm:text-md md:text-lg bg-accent text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blackish transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slideData.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <Slide {...item} />
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-4 sm:w-5' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
