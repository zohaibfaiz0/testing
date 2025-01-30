import { Metadata } from 'next';
import OrderConfirmationClient from './OrderConfirmationClient';

// Define the params type
type OrderPageParams = {
  orderId: string;
};

// Define metadata
export const metadata: Metadata = {
  title: 'Order Confirmation',
};

// Define the page component with explicit typing
export default async function OrderConfirmationPage({
  params,
}: {
  params: OrderPageParams;
}) {
  // You can add server-side data fetching here if needed
  return <OrderConfirmationClient orderId={params.orderId} />;
}