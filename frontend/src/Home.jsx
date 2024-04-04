import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Application</h1>
      <nav>
        <ul>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  );
};


export default Home;