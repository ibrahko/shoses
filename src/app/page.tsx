import { products, brands } from '@/lib/placeholder-data';
import AIRecommender from '@/components/products/ai-recommender';
import ProductCatalog from '@/components/products/product-catalog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="relative bg-primary/5 h-[60vh] flex items-center">
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">Find Your Perfect Pair</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore the latest and greatest in the world of sneakers. Your next favorite pair is just a click away.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/#products">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </div>
        <Image 
          src="https://picsum.photos/seed/hero-bg/1920/1080" 
          alt="Collection of stylish sneakers"
          fill
          className="object-cover opacity-10"
          priority
          data-ai-hint="sneakers collection"
        />
      </section>

      <div className="container mx-auto px-4 py-16">
        <AIRecommender />
        <ProductCatalog products={products} brands={brands} />
      </div>
    </>
  );
}
