// src/hooks/useAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

export function useAuth() {
  return useContext(AuthContext);
}
