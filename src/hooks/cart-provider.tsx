"use client";

import type { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useMemo } from "react";
import { CartContext, type CartContextType } from "@/hooks/use-cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );
  
  const cartTotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const addToCart = (product: Product, size: number, color: string) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === cartItemId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { id: cartItemId, product, quantity: 1, size, color }];
      }
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
