// src/app/product/[id]/page.tsx
import { fetchProducts, fetchProductById } from '@/sanity/lib/sanityClient';
import { ProductType } from '@/sanity/schemaTypes/productType';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateStaticParams() {
  const products: ProductType[] = await fetchProducts();
  return products.map((product) => ({
    id: product._id.toString(), // Ensure id is a string
  }));
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  if (!params?.id) {
    notFound();
  }

  try {
    const product = await fetchProductById(params.id);
    if (!product) notFound();
    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
