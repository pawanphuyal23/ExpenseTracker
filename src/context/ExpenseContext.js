import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext();

// Sample initial data
const initialExpenses = [
  {
    id: '1',
    date: '2025-10-25',
    amount: 300,
    description: 'Weekly groceries',
    location: 'Walmart',
    type: 'Credit',
    category: 'Shopping',
  },
  {
    id: '2',
    date: '2025-10-26',
    amount: 120.00,
    description: 'Travel to London',
    location: 'Bus Station',
    type: 'Debit',
    category: 'Travel',
  },
  {
    id: '3',
    date: '2025-10-27',
    amount: 8.50,
    description: 'App subscription refund',
    location: 'Online',
    type: 'Refund',
    category: 'Utility',
  },
];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(), // Simple unique ID generation
    };
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]); // Add new to the top
  };

  // Function to format the amount for display
  const formatAmount = (amount, type) => {
    const sign = (type === 'Credit') ? '+' : (type === 'Refund') ? '±' : '-';
    return `${sign} $${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, formatAmount }}>
      {children}
    </ExpenseContext.Provider>
  );
};