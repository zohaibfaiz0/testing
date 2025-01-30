// File: src/app/order-confirmation/[orderId]/page.tsx

import OrderConfirmationClient from './OrderConfirmationClient';

interface PageProps {
  params: {
    orderId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function OrderConfirmationPage({ params }: PageProps) {
  return <OrderConfirmationClient orderId={params.orderId} />;
}
