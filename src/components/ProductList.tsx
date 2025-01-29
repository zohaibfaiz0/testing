"use client";

import React, { useState, useEffect } from "react";
import { ProductType } from "@/sanity/schemaTypes/productType";
import { useCart } from "@/contexts/CartContext";
import { fetchProducts } from "@/sanity/lib/sanityClient";
import Link from "next/link";
import Image from "next/image";

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = (product: ProductType) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  if (isLoading) {
    return <div className="text-center py-10 text-lg font-medium">Loading products...</div>;
  }

  return (
    <div className="container mx-auto mt-4 px-4">
      {/* Section Title */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 uppercase tracking-wider">
        <span className="text-red-600">━ </span>New Arrivals<span className="text-red-600"> ━</span>
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-xl overflow-hidden flex flex-col h-[450px] sm:h-[500px] md:h-[550px] transition-transform duration-300 hover:shadow-lg"
          >
            <Link href={`/product/${product._id}`} className="flex flex-col h-full">
              {/* Product Image */}
              <div className="relative w-full h-2/3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-accent font-medium uppercase truncate text-sm sm:text-base">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 line-clamp-2 text-xs sm:text-sm mb-2">
                    {product.shortdesc}
                  </p>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  {/* Price */}
                  <span className="text-lg font-semibold">${product.price}</span>
                  {/* Rating */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < product.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-lg text-sm font-medium 
                      transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 
                      focus:ring-accent-light active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
