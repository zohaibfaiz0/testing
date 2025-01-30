import OrderConfirmationClient from './OrderConfirmationClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation',
};

type OrderPageParams = {
  orderId: string;
};

type OrderPageProps = {
  params: OrderPageParams;
};

export default async function OrderConfirmationPage({
  params,
}: OrderPageProps) {
  return <OrderConfirmationClient orderId={params.orderId} />;
}