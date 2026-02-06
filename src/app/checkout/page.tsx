"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">You can't checkout with an empty cart.</p>
        <Button asChild className="mt-6">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const shippingCost = 5.00;
  const taxes = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment and create an order
    clearCart();
    router.push('/account/orders/SNEAKER-1234'); // Redirect to a mock order confirmation
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Sneaker St" required />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Shoeville" required />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="12345" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** 1234" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM / YY" required />
                    </div>
                    <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                    </div>
                </div>
            </CardContent>
          </Card>
          <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
            Place Order
          </Button>
        </form>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Image src={item.product.image.src} alt={item.product.image.alt} width={40} height={30} className="rounded-md" data-ai-hint={item.product.image.hint} />
                    <div>
                        <p className="font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="font-semibold text-lg flex justify-between">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
