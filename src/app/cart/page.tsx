'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Memoize the total calculation to avoid unnecessary recalculations
  const calculateTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="container pt-16 mb-16">
      <h2 className="text-3xl text-center font-medium pb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.quantity}`} // More unique key based on quantity
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover"
                    loading="lazy" // Lazy load images to improve performance
                  />
                  <div>
                    <p>{item.product.name}</p>
                    <p>
                      ${item.product.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out py-2 px-4 rounded-full text-sm shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  aria-label={`Remove ${item.product.name} from cart`} // Accessibility improvement
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={clearCart}
              className="flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out py-2 px-6 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="Clear all items from cart" // Accessibility improvement
            >
              <FaTrash className="mr-2" />
              Clear Cart
            </button>

            <div>
              <span className="text-lg font-bold">Total: ${calculateTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link href="/Checkout">
            <button
              className="flex self-center items-center justify-center w-full max-w-[250px] bg-orange-500 hover:bg-orange-600 transition-all duration-300 ease-in-out text-white py-3 px-6 rounded-full mt-4 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
