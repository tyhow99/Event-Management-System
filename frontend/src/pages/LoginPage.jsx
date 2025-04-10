
import './LoginPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [workerId, setWorkerId] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add logic to handle login, e.g., sending a request to your backend
    console.log('Login attempt with:', workerId, password);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/worker_schedule');
        setData(response.data);
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="workerId">Worker ID:</label>
        <input
          type="text"
          id="workerId"
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
          placeholder="Worker ID"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
