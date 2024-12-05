import React, { useState, useEffect } from 'react';
import './Login.css';
import { useUser } from '../UserContext'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser(); 
  const navigate = useNavigate(); 

  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      login(storedUser);  
      navigate('/');
    }
  }, [login, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            login(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));  
            navigate('/');
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'An unknown error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
   
      <div className="login-card">
        <div className="avatar">
          <i className="fas fa-user" style={{ fontSize: '40px', color: '#260551' }}></i>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Email ID"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
          {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
