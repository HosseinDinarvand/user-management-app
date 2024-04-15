import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()

  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:5201/api/Account/login', formData);
      const token = response.data.token;
      axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${token}`;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );

      // You can store the token in localStorage or sessionStorage for later use
      localStorage.setItem('token', token);
      console.log('Login successful. Token:', token);
      // Redirect to dashboard or another page upon successful login
      navigate('/home')
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='button-container'>
          <button type="submit">Login</button>
          <Link to={'/signup'}>i don't have an account - signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
