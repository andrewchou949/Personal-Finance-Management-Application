import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [sessionTransactions, setSessionTransactions] = useState([]);
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
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
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
            setCategories(response.data.map(cat => ({ id: cat.id, name: cat.name })));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/api/transactions/', {
            amount,
            description,
            category
        }, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setAmount('');
            setDescription('');
            setCategory('');
            fetchTransactions();
            setSessionTransactions([...sessionTransactions, response.data]);
        })
        .catch(error => {
            setError('Failed to add transaction.');
            console.error('There was an error adding the transaction!', error);
        });
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:8000/api/transactions/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            fetchTransactions();
            setSessionTransactions(sessionTransactions.filter(transaction => transaction.id !== id));
        })
        .catch(error => {
            console.error('There was an error deleting the transaction!', error);
        });
    };

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };

    return (
        <div className="transactions-container">
            <div className="transactions-box">
                <h1>Transactions</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
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
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="submit">Add Transaction</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <h2>Session Transactions</h2>
                <ul>
                    {sessionTransactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.description}: ${transaction.amount} ({getCategoryName(transaction.category)})
                            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <Link to="/transaction-list" className="transaction-list-link">View All Transactions</Link>
            </div>
        </div>
    );
};

export default Transactions;