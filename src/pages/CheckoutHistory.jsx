import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import axios from "axios";
import "../styles/checkout-history.css";

const CheckoutHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders(user.id);
    }
  }, [user]);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;

      // Setear directamente las órdenes del usuario
      if (userData.orders) {
        setOrders(userData.orders);
      }
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  };

  if (!user) {
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
            <li key={order.order_id} className="order-card">
              <h2>Fecha de Transacción: {order.order_date}</h2>
              <p>Total: ${order.total_amount.toFixed(2)}</p>
              <h3>Detalles del Pedido:</h3>
              <ul>
                {order.order_details.map((detail) => (
                  <li key={`${order.order_id}-${detail.order_detail_id}`}>
                    <p>Producto ID: {detail.product_id}</p>
                    <p>Precio Unitario: ${detail.unit_price.toFixed(2)}</p>
                    <p>Cantidad: {detail.quantity}</p>
                    <p>Total: ${detail.total_price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <h3>Transacciones:</h3>
              <ul>
                {order.transactions.map((transaction) => (
                  <li key={`${order.order_id}-${transaction.transaction_id}`}>
                    <p>Fecha de Transacción: {transaction.transaction_date}</p>
                    <p>Método de Pago: {transaction.payment_method}</p>
                    <p>Monto: ${transaction.amount.toFixed(2)}</p>
                    <p>Estado: {transaction.status}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckoutHistory;
