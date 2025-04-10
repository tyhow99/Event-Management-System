import './LoginPage.css';
import { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [workerId, setWorkerId] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const idNumber = parseInt(workerId, 10);
    if (isNaN(idNumber)) {
      setLoginStatus('error');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/employee_information/${idNumber}`
      );

      if (response.data) {
        setLoginStatus('success');
        localStorage.setItem('workerId', workerId);
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
    }
  };

  return (
    <>
    <Navbar />
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="workerId">Worker ID:</label>
        <input
          type="number"
          id="workerId"
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
          placeholder="Enter your Worker ID"
          required />
        <button type="submit">Login</button>

        {loginStatus === 'success' && (
          <div className="success-message">Login successful! Redirecting...</div>
        )}

        {loginStatus === 'error' && (
          <div className="error-message">Invalid worker ID ❌</div>
        )}
      </form>
    </div>
    <Footer /></>
  );
};

export default Login;