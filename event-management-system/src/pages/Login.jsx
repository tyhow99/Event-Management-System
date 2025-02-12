import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [worker_id, setWorker_id] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Worker_id:', worker_id);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Worker ID:</label>
                    <input
                        type="worker_id"
                        id="worker_id"
                        value={worker_id}
                        onChange={(e) => setWorker_id(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
