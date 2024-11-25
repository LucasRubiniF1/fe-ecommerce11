import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/checkout-history.css";

const CheckoutHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Obtén el ID del usuario desde el local storage
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetchOrders(userId);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      // Cambia la URL al nuevo endpoint del backend
      const response = await axios.get(`http://localhost:8080/orders/user/${userId}`);
      const ordersData = response.data;

      // Setea las órdenes directamente
      if (ordersData) {
        setOrders(ordersData);
      }
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  };

  if (!localStorage.getItem("userId")) {
    return <div>Please log in to view your checkout history.</div>;
  }

  return (
    <div className="checkout-history-container">
      <h1>Historial de Compras</h1>
      {orders.length === 0 ? (
        <p>No tienes compras completadas.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId} className="order-card">
              <h2>Fecha de Transacción: {order.orderDate}</h2>
              <p>Total: ${order.totalAmount.toFixed(2)}</p>
              <p>Estado: {order.status}</p>
              <h3>Detalles del Pedido:</h3>
              {order.orderDetails.length === 0 ? (
                <p>No hay detalles de este pedido.</p>
              ) : (
                <ul>
                  {order.orderDetails.map((detail) => (
                    <li key={detail.id}>
                      <p>Producto ID: {detail.productId}</p>
                      <p>Precio Unitario: ${detail.unitPrice.toFixed(2)}</p>
                      <p>Cantidad: {detail.quantity}</p>
                      <p>Total: ${detail.totalPrice.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              )}
              <h3>Transacción:</h3>
              <p>ID de Transacción: {order.transactionId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckoutHistory;