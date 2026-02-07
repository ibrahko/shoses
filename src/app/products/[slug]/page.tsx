import { notFound } from 'next/navigation';
import { products } from '@/lib/placeholder-data';
import ProductView from './product-view';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
