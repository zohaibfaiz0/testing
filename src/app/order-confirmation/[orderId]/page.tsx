import { Metadata } from 'next';
import OrderConfirmationClient from './OrderConfirmationClient';

// Define the params type
type OrderPageParams = {
  orderId: string;
};

// Define the props type for the page
type OrderPageProps = {
  params: OrderPageParams;
};

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Order Confirmation',
};

// The main page component
export default async function OrderConfirmationPage({
  params,
}: OrderPageProps) {
  return <OrderConfirmationClient orderId={params.orderId} />;
}