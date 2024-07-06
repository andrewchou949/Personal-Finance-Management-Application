import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/transactions/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            const transactions = response.data;
            const chartData = transactions.reduce((acc, transaction) => {
                const date = transaction.date.split('T')[0];
                const category = transaction.category === 14 ? 'income' : transaction.category === 15 ? 'deposit' : 'expense';

                if (!acc[date]) {
                    acc[date] = { date, income: 0, expense: 0, deposit: 0 };
                }

                acc[date][category] += parseFloat(transaction.amount);
                return acc;
            }, {});

            const formattedData = Object.values(chartData).map(item => ({
                ...item,
                income: parseFloat(item.income).toFixed(2),
                expense: parseFloat(item.expense).toFixed(2),
                deposit: parseFloat(item.deposit).toFixed(2)
            }));

            setData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend formatter={(value) => capitalizeFirstLetter(value)} />
                <Bar dataKey="income" fill="#8884d8" />
                <Bar dataKey="expense" fill="#82ca9d" />
                <Bar dataKey="deposit" fill="#ffc658" />
            </BarChart>
        </div>
    );
};

export default Dashboard;