'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductType } from '@/sanity/schemaTypes/productType';
import { useCart } from '@/contexts/CartContext';
import { fetchDressProducts } from '@/sanity/lib/sanityClient';
import Link from 'next/link';
import Image from 'next/image';

const ProductItem = React.memo(({ product, onAddToCart }: { product: ProductType; onAddToCart: (product: ProductType) => void }) => (
  <div
    key={product._id}
    className="
      w-full 
      sm:w-[calc(50%-1rem)] 
      lg:w-[calc(33.333%-1rem)] 
      xl:w-[calc(25%-1rem)] 
      2xl:w-[calc(20%-1rem)]
      border 
      border-gray-200 
      rounded-xl 
      overflow-hidden 
      flex 
      flex-col 
      h-[450px]
      sm:h-[500px]
      md:h-[550px]
      transition-all 
      duration-300 
      ease-in-out
      hover:shadow-lg
    "
  >
    <Link href={`/product/${product._id}`} className="h-full flex flex-col">
      <div className="relative w-full h-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"  // Lazy loading images for better performance
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-accent font-medium uppercase truncate text-sm sm:text-base">
            {product.name}
          </h2>
          <p className="text-gray-500 line-clamp-2 text-xs sm:text-sm mb-2">
            {product.shortdesc}
          </p>
        </div>
        <div className="flex flex-col justify-between items-start">
          <span className="text-lg font-semibold">${product.price}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className='
              min-w-[100px] 
              inline-block 
              bg-accent 
              hover:bg-accent-dark 
              transition-all 
              duration-300 
              ease-in-out 
              text-white 
              py-2 
              px-4 
              rounded-lg 
              text-sm 
              font-medium 
              active:scale-95 
              hover:shadow-md 
              transform 
              hover:-translate-y-0.5
              focus:outline-none 
              focus:ring-2 
              focus:ring-accent-light
              text-center
            '
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  </div>
));

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  // Fetch products with memoization to prevent redundant fetch calls
  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await fetchDressProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleAddToCart = useCallback((product: ProductType) => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    addToCart(cartProduct);
  }, [addToCart]);

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="
        text-center 
        text-2xl 
        sm:text-3xl 
        mt-6
        md:text-4xl 
        font-bold 
        text-gray-800 
        mb-8 
        uppercase 
        tracking-wider
      ">
        <span className='text-red-600'>━ </span>Dresses<span className='text-red-600'> ━</span>
      </h2>
      <div className="flex flex-wrap gap-4 p-4 w-full justify-center">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
