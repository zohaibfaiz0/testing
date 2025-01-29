'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Order, Product } from '@/types/order';
import { v4 as uuidv4 } from 'uuid';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express' | 'nextDay'>('standard');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

  const stripe = useStripe();
  const elements = useElements();

  // Calculate total price of the cart
  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Handle order creation
  const handleOrderNow = async (paymentIntentId?: string) => {
    try {
      setLoading(true);
      setError(null);
  
      // Validate required fields
      if (!username || !email || !address) {
        throw new Error('Please fill in all required fields');
      }
  
      // Create order products with unique keys
      const orderProducts: Product[] = cart.map((item) => ({
        _key: uuidv4(), // Generate a unique key for each product
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));
  
      // Prepare order data
      const orderData: Order = {
        username,
        email,
        address,
        products: orderProducts,
        deliveryOption,
        paymentMethod,
        total: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        paymentIntentId: paymentMethod === 'card' ? paymentIntentId : undefined, // Include payment intent ID for card payments
      };
  
      // Send order data to API route
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create order');
      }
  
      // Clear the cart and show success message
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (paymentMethod === 'card') {
      if (!stripe || !elements) {
        setError('Payment system not initialized');
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError('Card element not found');
        return;
      }

      try {
        setLoading(true);

        // Create payment intent
        const response = await fetch('/api/payment/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: calculateTotal() * 100, // Convert to cents
            currency: 'usd',
          }),
        });

        const paymentResult = await response.json();

        if (!response.ok) {
          throw new Error(paymentResult.message || 'Failed to create payment intent');
        }

        const { clientSecret, paymentIntentId } = paymentResult;

        // Confirm card payment
        const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: username,
              email: email,
            },
          },
        });

        if (stripeError) {
          throw new Error(stripeError.message || 'Payment failed');
        }

        // Place the order after successful payment
        await handleOrderNow(paymentIntentId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment processing failed');
        console.error('Payment error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      // Place the order for cash on delivery
      await handleOrderNow();
    }
  };

  return (
    <div className="container mx-auto pt-16 mb-16 px-4">
      <h2 className="text-3xl text-center font-medium pb-8">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-600">
                      ${item.product.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Delivery Option</label>
              <select
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value as 'standard' | 'express' | 'nextDay')}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="standard">Standard Delivery</option>
                <option value="express">Express Delivery</option>
                <option value="nextDay">Next Day Delivery</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'cash')}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>

            {paymentMethod === 'card' && (
              <div>
                <label className="block text-sm font-medium mb-2">Card Details</label>
                <CardElement className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Order placed successfully!</p>}

            <button
              type="submit"
              disabled={loading || !stripe}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;