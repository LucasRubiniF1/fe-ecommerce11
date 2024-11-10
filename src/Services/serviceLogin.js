import axios from 'axios';

export const authenticate = async (username, password) => {
    try {
        const response = await axios.get("http://localhost:5000/users");
        const user = response.data.find((user) => user.username === username && user.password === password);
        const token = `fake_token_${user.id}`;
        return {
            id: user.id,
            email: user.email,
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

