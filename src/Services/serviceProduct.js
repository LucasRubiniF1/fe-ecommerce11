import axiosClient from "./axiosClient";

const API_URL = "/products"; // Base relativa ya que `axiosClient` tiene configurado `baseURL`

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error.response?.data || error.message);
    throw new Error("No se pudieron obtener los productos.");
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const response = await axiosClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por ID:", error.response?.data || error.message);
    throw new Error("No se pudo obtener el producto.");
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await axiosClient.post(`${API_URL}/create`, productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error.response?.data || error.message);
    throw new Error("No se pudo crear el producto.");
  }
};

// Actualizar un producto existente
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosClient.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error.response?.data || error.message);
    throw new Error("No se pudo actualizar el producto.");
  }
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const response = await axiosClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error.response?.data || error.message);
    throw new Error("No se pudo eliminar el producto.");
  }
};
