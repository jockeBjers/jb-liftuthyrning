import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { apiUtil } from "../utils/apiUtil";
import { calculateRentalCost } from "../utils/calculateRentalCost";

export function useOrderModalControl(orders: any[], orderItems: any[], lifts: any[]) {
  const { deleteFetch, putFetch } = apiUtil();
  const revalidator = useRevalidator();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
  const [showDeleteOrderItemModal, setShowDeleteOrderItemModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<any | null>(null);
  const [orderItemToDelete, setOrderItemToDelete] = useState<any | null>(null);

  const handleShowModal = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const deleteOrder = async (orderId: number) => {
    await deleteFetch(`/api/orders/${orderId}`);
    setShowDeleteOrderModal(false);
    setOrderToDelete(null);
    handleCloseModal();
    revalidator.revalidate();
  };

  const deleteOrderItem = async (orderItemId: number) => {
    const orderItem = orderItems.find(item => item.id === orderItemId);
    if (!orderItem) return;

    const order = orders.find(o => o.id === orderItem.orderId);
    if (!order) return;

    const itemCost = calculateRentalCost(
      order.orderDate,
      order.returnDate,
      orderItem.dailyPrice,
      orderItem.startFee
    );

    await deleteFetch(`/api/orderItems/${orderItemId}`);
    const newTotalPrice = order.totalPrice - itemCost;

    await putFetch(`/api/orders/${order.id}`, { totalPrice: newTotalPrice });

    if (selectedOrder && selectedOrder.id === order.id) {
      setSelectedOrder({ ...selectedOrder, totalPrice: newTotalPrice });
    }

    revalidator.revalidate();
  };

  const getOrderItems = (orderId: number) =>
    orderItems.filter(item => item.orderId === orderId);

  const getLiftName = (liftId: number) => {
    const lift = lifts.find(l => l.id === liftId);
    return lift ? `${lift.name} (${lift.brand})` : "Okänd lift";
  };

    let deleteMessage = "";
    if (orderItemToDelete) {
        const isLastItem = getOrderItems(orderItemToDelete.orderId).length === 1;
        deleteMessage = isLastItem
            ? `Detta är det sista objektet i order #${orderItemToDelete.orderId}. Att ta bort det kommer också ta bort hela ordern. Är du säker?`
            : `Är du säker på att du vill ta bort ${getLiftName(orderItemToDelete.liftId)} från order #${orderItemToDelete.orderId}?`;
    }
  return {
    selectedOrder, setSelectedOrder,
    showModal, setShowModal,
    showDeleteOrderModal, setShowDeleteOrderModal,
    showDeleteOrderItemModal, setShowDeleteOrderItemModal,
    orderToDelete, setOrderToDelete,
    orderItemToDelete, setOrderItemToDelete,
    handleShowModal, handleCloseModal,
    deleteOrder, deleteOrderItem,
    getOrderItems, getLiftName,
    deleteMessage
  };
}
