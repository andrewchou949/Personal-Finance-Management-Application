import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/transactions/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                processData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const processData = (data) => {
        const processedData = data.reduce((acc, transaction) => {
            const date = transaction.date.split('T')[0];
            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }
            if (transaction.category === 1) {
                acc[date].income += parseFloat(transaction.amount);
            } else {
                acc[date].expense += parseFloat(transaction.amount);
            }
            return acc;
        }, {});

        setChartData(Object.values(processedData));
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="chart">
                <BarChart width={600} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" />
                    <Bar dataKey="expense" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    );
};

export default Dashboard;