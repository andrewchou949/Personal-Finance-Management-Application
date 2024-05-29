import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Import the CSS file

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
                username,
                password,
                password2,
            });
            navigate('/login');
        } catch (error) {
            setError('Registration failed');
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
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;