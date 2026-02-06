"use client";

import type { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { X } from "lucide-react";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const increment = () => updateQuantity(item.id, item.quantity + 1);
  const decrement = () => updateQuantity(item.id, item.quantity - 1);

  return (
    <div className="flex items-start gap-4 py-4">
      <Image
        src={item.product.image.src}
        alt={item.product.image.alt}
        width={80}
        height={60}
        className="rounded-md object-cover"
        data-ai-hint={item.product.image.hint}
      />
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{item.product.name}</h3>
        <p className="text-muted-foreground text-sm">Size: {item.size}</p>
        <p className="text-muted-foreground text-sm">Color: {item.color}</p>
        <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={decrement} disabled={item.quantity <= 1}>-</Button>
            <Input
                type="number"
                value={item.quantity}
                onChange={handleQuantityChange}
                className="h-8 w-12 text-center"
                min="1"
            />
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={increment}>+</Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground h-8 w-8 mt-2"
          onClick={() => removeFromCart(item.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
