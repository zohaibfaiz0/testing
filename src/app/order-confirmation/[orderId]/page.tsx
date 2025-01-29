'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/types/order';

interface OrderConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderConfirmation({ params }: OrderConfirmationPageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="container mx-auto pt-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto pt-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto pt-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-medium mb-4">Order Not Found</h2>
          <p>We couldn't find the order you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-16 mb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium mb-4">Order Confirmation</h2>
          <p className="text-green-500 font-medium">Thank you for your order!</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-xl font-medium mb-4">Order Details</h3>
          <div className="space-y-4">
            <p><span className="font-medium">Order ID:</span> {params.orderId}</p>
            <p><span className="font-medium">Status:</span> {order.status}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
            <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-xl font-medium mb-4">Customer Information</h3>
          <div className="space-y-4">
            <p><span className="font-medium">Name:</span> {order.username}</p>
            <p><span className="font-medium">Email:</span> {order.email}</p>
            <p><span className="font-medium">Address:</span> {order.address}</p>
            <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.products.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b py-4 last:border-0">
                <div>
                  <p className="font-medium">Product ID: {item.productId}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}