import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} className="block">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            className="w-full h-48 object-cover"
            data-ai-hint={product.image.hint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
        <CardTitle className="text-lg leading-tight mb-2">
            <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                {product.name}
            </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button asChild size="sm" variant="outline">
          <Link href={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
