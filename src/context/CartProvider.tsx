import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type Lift from "../interfaces/Lift";
type CartItem = { lift: Lift };

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (lift: Lift) => void;
  removeFromCart: (liftId: number) => void;
  clearCart: () => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const addToCart = (lift: Lift) => {
    if (!startDate || !endDate) return;
    if (cartItems.some(item => item.lift.id === lift.id)) return;
    setCartItems(prev => [...prev, { lift }]);
  };

  const removeFromCart = (liftId: number) => {
    setCartItems(prev => prev.filter(item => item.lift.id !== liftId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, startDate, endDate, setStartDate, setEndDate }}
    >
      {children}
    </CartContext.Provider>
  );
}
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() { 
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}