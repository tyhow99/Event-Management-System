import './LoginPage.css';
import { useState } from 'react';
import axios from 'axios';
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
        // Check if the user is a manager
        if (response.data.job.toLowerCase() === 'manager') {
          setLoginStatus('success');
          localStorage.setItem('workerId', workerId);
          localStorage.setItem('isManager', 'true');
          setIsAuthenticated(true);
          navigate('/home');
        } else {
          setLoginStatus('not_manager');
        }
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="workerId">Manager ID:</label>
        <input
          type="number"
          id="workerId"
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
          placeholder="Enter your Manager ID"
          required
        />
        <button type="submit">Login</button>

        {loginStatus === 'success' && (
          <div className="success-message">Login successful! Redirecting...</div>
        )}

        {loginStatus === 'error' && (
          <div className="error-message">Invalid manager ID ❌</div>
        )}

        {loginStatus === 'not_manager' && (
          <div className="error-message">Access restricted to managers only ⚠️</div>
        )}
      </form>
    </div>
  );
};

export default Login;