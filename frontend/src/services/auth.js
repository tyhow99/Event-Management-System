import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend API URL

const login = async (workerId, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { workerId, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

const logout = () => {
  // Implement logout logic, e.g., remove tokens or clear session
  console.log('User logged out');
};

export default { login, logout };
