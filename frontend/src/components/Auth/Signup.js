import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
                username,
                password,
                password2: confirmPassword,
            });
            setSuccess('Registration successful');
            // Clear the form
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response) {
                const backendErrors = error.response.data;
                if (backendErrors.password) {
                    setError(backendErrors.password[0]);
                } else {
                    setError('Registration failed');
                }
            } else {
                setError('Registration failed');
            }
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;