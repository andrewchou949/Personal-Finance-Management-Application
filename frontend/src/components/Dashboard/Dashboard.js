import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h1>Dashboard</h1>
                <nav>
                    <ul>
                        <li><Link to="/transactions">Transactions</Link></li>
                        {/* Add more links here for other features */}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;