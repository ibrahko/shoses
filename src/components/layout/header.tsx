"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Footprints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import CartSheet from "@/components/cart/cart-sheet";
import { SneakerVerseLogo } from "@/components/icons";

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "All Shoes" },
    { href: "/account/orders", label: "My Orders" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Footprints className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">SneakerVerse</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-full max-w-xs items-center">
              <Input
                type="search"
                placeholder="Search shoes..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                  <Link href="/login">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b pb-4">
                       <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                          <Footprints className="h-6 w-6 text-primary" />
                          <span className="font-bold text-lg">SneakerVerse</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-4 py-6">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
