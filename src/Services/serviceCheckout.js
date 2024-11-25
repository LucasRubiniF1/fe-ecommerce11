import axios from 'axios';
import useStore from "../hooks/UseStore.js";

export const checkoutCart = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicia sesión.");
    }

    if (!userId) {
      throw new Error("ID de usuario no válido.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de que el token esté en el formato correcto
      },
    };

    const orderResponse = await axios.post(
      `http://localhost:8080/cart/${userId}/checkout`, 
      {},
      config 
    );

    const order = orderResponse.data;
    console.log(orderResponse.data);

    //useStore.getState().updateCart([]); 
    localStorage.setItem("cart", JSON.stringify([])); 

    
    return order;

  } catch (error) {
    if (error.response) {
      console.error("Error de respuesta del servidor:", error.response.data);
      throw new Error(`Error en el servidor: ${error.response.data.message || error.message}`);
    } else if (error.request) {
      console.error("Error en la solicitud:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
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