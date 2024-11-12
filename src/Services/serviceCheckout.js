import axios from 'axios';
import useStore from "../hooks/UseStore.js";

export const checkoutCart = async (userId) => {
  try {
    // Crea la orden en el servidor
    const orderResponse = await axios.post('http://localhost:5000/orders', {
      user_id: userId,
      status: "PENDING",
      order_date: new Date().toISOString(),
      total_amount: 0 // Este será calculado
    });

    const order = orderResponse.data;
    let totalCost = 0;

    // Recupera el carrito del usuario
    const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
    const user = userResponse.data;
    const cartItems = user.cart.items || [];

    // Itera sobre los ítems del carrito para crear los detalles de la orden
    const orderDetails = await Promise.all(
      cartItems.map(async (item) => {
        const productResponse = await axios.get(`http://localhost:5000/products/${item.product_id}`);
        const product = productResponse.data;
        console.log(product.price);

        const itemTotalPrice = product.price * item.quantity;
        totalCost += itemTotalPrice;

        // Crea el detalle de la orden
        const orderDetailResponse = await axios.post('http://localhost:5000/orderDetail', {
          order_id: order.id,
          product_id: product.id,
          unit_price: product.price,
          quantity: item.quantity,
          total_price: itemTotalPrice
        });

        return orderDetailResponse.data;
      })
    );

    // Actualiza la orden con el total calculado y los detalles
    await axios.put(`http://localhost:5000/orders/${order.id}`, {
      ...order,
      total_amount: totalCost,
      status: "COMPLETED",
      order_details: orderDetails
    });

    // Crea una transacción para la orden
    const transactionResponse = await axios.post('http://localhost:5000/transactions', {
      order_id: order.id,
      transaction_date: new Date().toISOString(),
      amount: totalCost,
      payment_method: "CREDIT_CARD",
      status: "COMPLETED"
    });
    const transaction = transactionResponse.data;

    // Agrega la orden y transacción en el usuario
    const updatedUser = {
      ...user,
      orders: [
        ...(user.orders || []),
        {
          order_id: order.id,
          order_date: order.order_date,
          status: order.status,
          total_amount: totalCost,
          order_details: orderDetails,
          transactions: [transaction]
        }
      ],
      cart: {
        ...user.cart,
        items: [] // Limpia el carrito
      }
    };

    // Actualiza el usuario con la nueva orden y carrito vacío
    await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);

    return updatedUser.orders[updatedUser.orders.length - 1]; // Retorna la última orden creada
  } catch (error) {
    console.error("Error en checkoutCart:", error);
    throw error;
  }
};

export const clearCart = async () => {
    // Vacía el carrito en la tienda global (Zustand)
    useStore.getState().clearCart();
  
    // Vacía el carrito en localStorage
    localStorage.removeItem('cart');
  
    // Aquí también podrías hacer una solicitud al backend para vaciar el carrito del usuario si lo necesitas
   // try {
    //  await axios.put(`http://localhost:5000/cart`, { userid: user.id });
    //} catch (error) {
      //console.error("Error al vaciar el carrito en el servidor:", error);
    //}
  };