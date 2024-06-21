import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Personal Finance Management App</h1>
            <div className="home-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transactions">Transactions</Link>
            </div>
        </div>
    );
};

export default Home;