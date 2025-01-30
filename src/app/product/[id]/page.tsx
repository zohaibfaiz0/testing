// src/app/product/[id]/page.tsx
import { fetchProducts, fetchProductById } from '@/sanity/lib/sanityClient';
import { ProductType } from '@/sanity/schemaTypes/productType';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

// ✅ Ensure correct typing for static params
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const products: ProductType[] = await fetchProducts();
  return products.map((product) => ({
    id: product._id.toString(), // Ensure it's a string
  }));
}

// ✅ Explicitly define the component's props
type ProductDetailPageProps = {
  params: { id: string };
};

// ✅ Ensure correct handling of params
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  if (!params || typeof params.id !== 'string') {
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
