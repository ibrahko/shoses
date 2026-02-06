"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Footprints,
  LogOut,
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import CartSheet from "@/components/cart/cart-sheet";
import { useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";


export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "All Shoes" },
  ];

  if (user) {
    navLinks.push({ href: "/account/orders", label: "My Orders" });
  }


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
                {loading ? (
                  <DropdownMenuLabel>Loading...</DropdownMenuLabel>
                ) : user ? (
                  <>
                    <DropdownMenuLabel>Hi, {user.displayName || user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/login">Log In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0">
                <SheetHeader className="border-b p-6">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <Footprints className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg text-foreground">SneakerVerse</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-4 p-6">
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
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
