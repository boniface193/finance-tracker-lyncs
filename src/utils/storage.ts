import { Transaction, Budget, MonthData, TransactionCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

const defaultBudgets: Budget[] = [
  { category: 'Housing', limit: 2000, spent: 0 },
  { category: 'Transportation', limit: 400, spent: 0 },
  { category: 'Food & Dining', limit: 600, spent: 0 },
  { category: 'Entertainment', limit: 200, spent: 0 },
  { category: 'Shopping', limit: 300, spent: 0 },
  { category: 'Utilities', limit: 500, spent: 0 },
  { category: 'Healthcare', limit: 300, spent: 0 },
  { category: 'Salary', limit: 0, spent: 0 },
  { category: 'Gifts', limit: 0, spent: 0 },
  { category: 'Side Hustle', limit: 0, spent: 0 },
  { category: 'Savings', limit: 0, spent: 0 },
];

const defaultTransactions: Transaction[] = [
  {
    id: uuidv4(),
    amount: 5000,
    category: 'Salary',
    description: 'Monthly Salary',
    date: new Date().toISOString(),
    type: 'income',
  },
  {
    id: uuidv4(),
    amount: 1500,
    category: 'Housing',
    description: 'Rent',
    date: new Date().toISOString(),
    type: 'expense',
  },
  {
    id: uuidv4(),
    amount: 120,
    category: 'Food & Dining',
    description: 'Groceries',
    date: new Date().toISOString(),
    type: 'expense',
  },
];

export const calculateTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return { income, expenses };
};

export const calculateCategorySpending = (transactions: Transaction[], category: TransactionCategory): number => {
  return transactions
    .filter(t => t.type === 'expense' && t.category === category)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getCurrentMonthData = (date: Date): MonthData => {
  const key = `finance-${date.getFullYear()}-${date.getMonth()}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    return JSON.parse(stored);
  }

  // Create default data with sample transactions
  const transactions = defaultTransactions.map(t => ({
    ...t,
    date: date.toISOString(),
  }));

  const { income, expenses } = calculateTotals(transactions);

  const budgets = defaultBudgets.map(budget => ({
    ...budget,
    spent: calculateCategorySpending(transactions, budget.category),
  }));

  const monthData: MonthData = {
    year: date.getFullYear(),
    month: date.getMonth(),
    income,
    expenses,
    transactions,
    budgets,
  };

  localStorage.setItem(key, JSON.stringify(monthData));
  return monthData;
};

export const saveMonthData = (date: Date, data: MonthData) => {
  const key = `finance-${date.getFullYear()}-${date.getMonth()}`;
  localStorage.setItem(key, JSON.stringify(data));
};