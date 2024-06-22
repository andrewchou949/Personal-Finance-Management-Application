import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionList.css';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        category: ''
    });

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

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setFormData({
            amount: transaction.amount,
            description: transaction.description,
            category: transaction.category
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
            fetchTransactions();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://127.0.0.1:8000/api/transactions/${selectedTransaction.id}/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            fetchTransactions();
            setSelectedTransaction(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="transaction-list-container">
            <h1>Transaction List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{getCategoryName(transaction.category)}</td>
                            <td>
                                <button onClick={() => handleEdit(transaction)}>Edit</button>
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedTransaction && (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Transaction</h2>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default TransactionList;