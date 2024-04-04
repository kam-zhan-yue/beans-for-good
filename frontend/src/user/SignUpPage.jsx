import React, { useState } from 'react';

function SignUpPage() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
        // Reset any previous error
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Basic client-side validation
        if (userData.password !== userData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        fetch('/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: userData.username,
              password: userData.password,
          }),
      })
      .then(response => {
          if (!response.ok) {
              // If server response wasn't ok, throw an error with the status
              throw new Error(`Server responded with ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Success:', data);
          // Handle success, such as redirecting the user or clearing the form
      })
      .catch(error => {
          console.error('Error during sign up:', error);
          setError('Failed to sign up. Please try again.');
      });
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                {/* Form fields */}
                {error && <div className="error">{error}</div>}
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPage;