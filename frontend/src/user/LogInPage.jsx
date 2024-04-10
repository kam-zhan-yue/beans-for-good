import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset the error message on new submission

    try {
      const response = await fetch(`${StaticHelper.getApi()}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
    
        const data = await response.json();
        console.log(data.message); 
      } else {
        // Handle different error statuses from the server with more specific messages
        const errorData = await response.json(); // Assuming the server responds with JSON error messages
        if (response.status === 401) {
          setErrorMessage('Invalid credentials. Please try again.');
        } else if (response.status === 404) {
          setErrorMessage('User not found.');
        } else {
          setErrorMessage(errorData.message);
        }
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;

