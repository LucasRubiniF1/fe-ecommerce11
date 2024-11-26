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
      const response = await axios.get(
        `http://localhost:8080/orders/user/${userId}`
      );
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
    return (
      <div className="checkout-history-container">
        <h1>Historial de Compras</h1>
        <p>Por favor, inicia sesión para ver tu historial de compras.</p>
      </div>
    );
  }

  return (
    <div className="checkout-history-container">
      <h1>Historial de Compras</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No tienes compras completadas.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <h2>Transacción #{order.orderId}</h2>
                <p>{order.orderDate}</p>
              </div>
              <div className="order-summary">
                <p>
                  <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Estado:</strong> {order.status}
                </p>
              </div>
              <div className="order-details">
                <h3>Detalles del Pedido:</h3>
                {order.orderDetails.length === 0 ? (
                  <p>No hay detalles de este pedido.</p>
                ) : (
                  <ul>
                    {order.orderDetails.map((detail) => (
                      <li key={detail.id} className="order-detail-item">
                        <p>
                          <strong>Producto ID:</strong> {detail.productId}
                        </p>
                        <p>
                          <strong>Precio Unitario:</strong> $
                          {detail.unitPrice.toFixed(2)}
                        </p>
                        <p>
                          <strong>Cantidad:</strong> {detail.quantity}
                        </p>
                        <p>
                          <strong>Total:</strong> $
                          {detail.totalPrice.toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* <div className="transaction-info">
                <h3>Transacción:</h3>
                <p>
                  <strong>ID de Transacción:</strong> {order.transactionId}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckoutHistory;
