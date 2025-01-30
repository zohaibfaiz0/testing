// File: src/app/order-confirmation/[orderId]/page.tsx

import OrderConfirmationClient from './OrderConfirmationClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation',
};

type OrderPageParams = {
  orderId: string;
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: OrderPageParams;
}) {
  return <OrderConfirmationClient orderId={params.orderId} />;
}
