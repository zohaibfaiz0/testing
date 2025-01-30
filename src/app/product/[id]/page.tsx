// src/app/product/[id]/page.tsx
import { fetchProducts, fetchProductById } from '@/sanity/lib/sanityClient';
import { ProductType } from '@/sanity/schemaTypes/productType';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

// Generate static paths
export async function generateStaticParams() {
  const products: ProductType[] = await fetchProducts();
  return products.map((product) => ({
    id: product._id,
  }));
}

// Simplified props type that matches Next.js expectations
interface PageProps {
  params: {
    id: string;
  };
}

// Main component with server-side data fetching
export default async function ProductDetailPage({ params }: PageProps) {
  // Server-side validation
  if (!params?.id) notFound();

  // Server-side data fetching
  const product = await fetchProductById(params.id);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}