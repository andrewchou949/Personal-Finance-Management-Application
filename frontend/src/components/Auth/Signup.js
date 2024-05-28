import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Signup;