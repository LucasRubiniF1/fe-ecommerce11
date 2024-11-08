import axios from "axios";

export const authenticate = async (email, password) => {
  const response = await axios.post(
    "http://localhost:5000/authenticate_user",
    {
      email,
      password,
    }
  );
  return response.data;
};