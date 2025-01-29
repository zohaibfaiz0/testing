"use client";

import { ProductType } from "@/sanity/schemaTypes/productType";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailClient({ product }: { product: ProductType }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Product Image Section */}
        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg shadow-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Product Information Section */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Product Name */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Product Description */}
          <p className="text-base md:text-lg text-gray-700">{product.fulldesc}</p>

          {/* Price and Rating */}
          <div className="flex flex-col space-y-3">
            {/* Price */}
            <span className="text-2xl md:text-3xl font-semibold text-accent">
              <span className="text-blackish">$</span>
              {product.price}
            </span>

            {/* Rating */}
            <div className="flex items-center text-lg text-gray-500">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < product.rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-base text-gray-600">({product.rating}/5)</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-accent text-white px-6 md:px-8 py-2 md:py-3 rounded-lg 
              hover:bg-blackish focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 
              transition duration-300 text-base md:text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
