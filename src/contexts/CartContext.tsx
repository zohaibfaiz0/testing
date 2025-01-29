'use client'; // Ensures this component is client-side rendered

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

// Define the Product interface for each product in the cart
interface Product {
  id: string; // Unique identifier for the product (changed to string for flexibility)
  name: string; // Name of the product
  price: number; // Price of the product
  image: string; // URL of the product's image
}

// Define the structure of each CartItem
interface CartItem {
  product: Product; // The product itself
  quantity: number; // Quantity of the product in the cart
}

// Define the structure of the CartContext's value
interface CartContextType {
  cart: CartItem[]; // The array of items in the cart
  addToCart: (product: Product) => void; // Function to add a product to the cart
  removeFromCart: (id: string) => void; // Function to remove a product from the cart by its ID
  clearCart: () => void; // Function to clear the entire cart
}

// Create a context with an undefined default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the CartProvider component that wraps the application or part of it
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // State to store the cart's items
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart'); // Retrieve the cart from localStorage
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Parse and set the cart state
    }
  }, []);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage with the latest cart
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      ); // Check if the product already exists in the cart

      if (existingItem) {
        // If it exists, update its quantity
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // Increase quantity
            : item
        );
      } else {
        // If it doesn't exist, add it to the cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart by its ID
  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== id) // Filter out the product with the given ID
    );
  };

  // Function to clear all items from the cart
  const clearCart = () => setCart([]);

  // Return the context provider with the cart and its related functions
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartContext in other components
export const useCart = () => {
  const context = useContext(CartContext); // Access the context value
  if (!context) {
    // Ensure the hook is used within a CartProvider
    throw new Error('useCart must be used within a CartProvider');
  }
  return context; // Return the context value
};
