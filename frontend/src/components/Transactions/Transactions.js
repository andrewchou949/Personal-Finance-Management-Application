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
        fetchCategories();
    }, []);

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
        const selectedCategory = categories.find(cat => cat.name === category);
        const data = {
            amount: parseFloat(amount),
            description: description,
            category: selectedCategory ? selectedCategory.id : null
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
            setTransactions(prevTransactions => [...prevTransactions, response.data]);
            setAmount('');
            setDescription('');
            setCategory('');
        })
        .catch(error => {
            setError('Failed to add transaction.');
            if (error.response) {
                console.error('Error adding transaction:', error.response.data);
            } else {
                console.error('Error adding transaction:', error.message);
            }
        });
    };

    const handleDelete = async (transactionId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/transactions/${transactionId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
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
                        onChange={handleAmountChange}
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
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="submit">Add Transaction</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.description}: ${transaction.amount}
                            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Transactions;