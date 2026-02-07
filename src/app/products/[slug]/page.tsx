"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/lib/placeholder-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export default function ProductDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError('Please select a size and color.');
      return;
    }
    setError('');
    addToCart(product, selectedSize, selectedColor);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-lg"
            data-ai-hint={product.image.hint}
            priority
          />
        </div>

        <div>
          <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mt-2 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground text-base leading-relaxed">{product.longDescription}</p>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Color</Label>
              <div className="flex gap-2 mt-2">
                {product.colors.map(color => (
                  <Button 
                    key={color.name}
                    variant={selectedColor === color.name ? 'default' : 'outline'}
                    className={`h-10 w-10 p-0 rounded-full border-2 ${selectedColor === color.name ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select color ${color.name}`}
                  >
                    <span 
                      className="h-8 w-8 rounded-full block" 
                      style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.1)' }}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div>
                <Label className="text-base font-semibold">Size</Label>
                <RadioGroup 
                    value={selectedSize?.toString()} 
                    onValueChange={(value) => setSelectedSize(Number(value))}
                    className="flex flex-wrap gap-2 mt-2"
                >
                    {product.sizes.map(size => (
                        <div key={size}>
                            <RadioGroupItem value={size.toString()} id={`size-${size}`} className="sr-only" />
                            <Label 
                                htmlFor={`size-${size}`}
                                className="flex items-center justify-center rounded-md border-2 text-sm p-1 h-10 w-12 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 hover:bg-accent/10"
                            >
                                {size}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
          </div>
          
          {error && <p className="text-destructive text-sm mt-4">{error}</p>}

          <Button size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          
           <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span><span className="font-semibold text-foreground">Free shipping & returns.</span> Join our rewards program for free. Some exclusions apply.</span>
           </div>
        </div>
      </div>
    </div>
  );
}
