"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import CartItem from "./cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type CartSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                 <div className="flex justify-between font-semibold text-lg">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={clearCart}>
                        Clear Cart
                    </Button>
                    <SheetClose asChild>
                        <Button asChild className="w-full bg-accent hover:bg-accent/90">
                            <Link href="/checkout">Checkout</Link>
                        </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground mt-2">Add some sneakers to get started!</p>
            <SheetClose asChild>
                <Button asChild className="mt-6">
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
