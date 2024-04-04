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

        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userData.username,
                    password: userData.password, // In a real app, ensure secure handling of passwords
                }),
            });

            if (response.ok) {
                // Handle success
                const result = await response.json();
                console.log('Success:', result);
                // Redirect the user or clear the form, etc.
            } else {
                // Handle server-side validation errors or other issues
                setError('Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
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