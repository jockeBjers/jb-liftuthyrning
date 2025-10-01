import { useState } from "react";
import { apiUtil } from "../utils/apiUtil";
import { calculateRentalCost } from "../utils/calculateRentalCost";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";

export function useBooking() {
  const { cartItems, startDate, endDate, clearCart } = useCart();
  const { user } = useAuth();
  const { postFetch } = apiUtil();

  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const formatLocalDate = (date: Date) =>
    new Intl.DateTimeFormat("sv-SE").format(date);

  function calculateItemCost(item: { lift: { dailyPrice: number; startFee: number } }): number {
    if (!startDate || !endDate) return 0;
    return calculateRentalCost(startDate, endDate, item.lift.dailyPrice, item.lift.startFee);
  }

  function calculateTotalCost(): number {
    return cartItems.reduce((sum, item) => sum + calculateItemCost(item), 0);
  }

  const handleBooking = async (selectedUserId: number | null, onSuccess?: () => void) => {
    const orderUserId = user?.role === "admin" && selectedUserId ? selectedUserId : user?.id;
    if (!orderUserId) return;

    setIsBooking(true);
    try {
      const totalPrice = calculateTotalCost();

      const order = await postFetch("/api/orders", {
        userId: orderUserId,
        orderDate: formatLocalDate(startDate!),
        returnDate: formatLocalDate(endDate!),
        totalPrice,
      });

      const orderItemPromises = cartItems.map((item) =>
        postFetch("/api/orderItems", {
          orderId: order.insertId,
          liftId: item.lift.id,
          dailyPrice: item.lift.dailyPrice,
          startFee: item.lift.startFee,
        })
      );

      const minSpinnerTime = new Promise((resolve) => setTimeout(resolve, 500));
      await Promise.all([...orderItemPromises, minSpinnerTime]);

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        clearCart();
        onSuccess?.();
      }, 3000);

    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setIsBooking(false);
    }
  };

  return {
    isBooking,
    bookingSuccess,
    calculateTotalCost,
    handleBooking,
    calculateItemCost

  };
}
