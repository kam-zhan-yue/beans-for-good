import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate(); 

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <button onClick={() => navigate('/signup')}>Sign Up</button> {/* Navigate to the signup page */}
      <button onClick={() => navigate('/login')}>Log In</button> {/* Navigate to the login page */}
    </div>
  );
};

export default HomePage;