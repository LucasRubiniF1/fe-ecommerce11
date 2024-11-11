import axios from 'axios';

export const authenticate = async (username, password) => {
    try {
        const response = await axios.get("http://localhost:5000/users");
        const user = response.data.find((user) => user.username === username && user.password === password);
        const token = `fake_token_${user.id}`;
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            birth: user.birth,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            token: token, // El token simulado
          }; 
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("An error occurred during authentication");
    }
};

export const validateUser = async (formData, setError) => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
  
      // Verificar si el username o el email ya existen
      const userExists = users.some(user => user.username === formData.username || user.email === formData.email);
      if (userExists) {
        setError('Ya existe el username o el email. Intente nuevamente.');
        return false;
      }
      return true;
  
    } catch (error) {
      console.error("Error al validar usuario:", error);
      setError('Hubo un problema al validar los datos. Intente nuevamente.');
      return false;
    }
  };

  export const registerUser = async (formData, setError) => {
    try {
      // Realizar la solicitud POST para registrar el usuario
      await axios.post('http://localhost:5000/users', formData);
      
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      
      // Establecer mensaje de error
      setError('No se pudo registrar el usuario. Intenta nuevamente más tarde.');
    }
  };

  export const getUsersAxios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      return response.data; // Retorna la data completa si el array de usuarios está en response.data
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error; // Lanza el error para ser manejado en la llamada
    }
  };
  