// src/app/product/[id]/page.tsx
import { fetchProducts, fetchProductById } from '@/sanity/lib/sanityClient';
import { ProductType } from '@/sanity/schemaTypes/productType';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

// ✅ This function generates static paths
export async function generateStaticParams() {
  const products: ProductType[] = await fetchProducts();
  return products.map((product) => ({
    id: product._id, // Ensure `_id` is used as is
  }));
}

// ✅ Explicitly define the prop types
interface ProductDetailPageProps {
  params: { id: string };
}

// ✅ Main component
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  if (!params?.id) {
    notFound(); // Triggers Next.js 404 page
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
