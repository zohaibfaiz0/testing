// File: src/app/order-confirmation/[orderId]/page.tsx

import OrderConfirmationClient from './OrderConfirmationClient';

type Props = {
  params: { orderId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function OrderConfirmationPage({ params, searchParams }: Props) {
  return (
    <div>
      <OrderConfirmationClient orderId={params.orderId} />
    </div>
  );
}

export default OrderConfirmationPage;
