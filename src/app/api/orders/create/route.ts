// app/api/orders/create/route.ts
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-28',
});

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // Validate order data
    if (!orderData || !orderData.products || orderData.products.length === 0) {
      return NextResponse.json(
        { message: 'Invalid order data' },
        { status: 400 }
      );
    }

    // Create order in Sanity
    const result = await client.create({
      _type: 'order',
      ...orderData,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: 'Order created successfully',
      orderId: result._id,
    }, { status: 201 });

  } catch (error) {
    console.error('Order creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { message: 'Failed to create order', error: errorMessage },
      { status: 500 }
    );
  }
}