import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTransactions();
        fetchCategories();
    }, []);

    const fetchTransactions = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/transactions/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('Transactions fetched:', response.data);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/categories/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('Categories fetched:', response.data);
            setCategories(response.data.map(cat => cat.name));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            amount: parseFloat(amount),
            description: description,
            category: category
        };
        console.log('Submitting transaction:', data);
    
        axios.post('http://127.0.0.1:8000/api/transactions/', data, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Transaction added:', response.data);
            setAmount('');
            setDescription('');
            setCategory('');
            fetchTransactions();
        })
        .catch(error => {
            setError('Failed to add transaction.');
            console.error('Error adding transaction:', error.response.data);
        });
    };

    return (
        <div className="transactions-container">
            <div className="transactions-box">
                <h1>Transactions</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <button type="submit">Add Transaction</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>{transaction.description}: ${transaction.amount}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Transactions;