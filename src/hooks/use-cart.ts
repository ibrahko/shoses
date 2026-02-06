"use client";

import type { CartItem, Product } from "@/lib/types";
import { createContext, useContext } from "react";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: number, color: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
