export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string; // ISO string
  type: 'income' | 'expense';
}

export type TransactionCategory =
  | 'Housing'
  | 'Transportation'
  | 'Food & Dining'
  | 'Entertainment'
  | 'Shopping'
  | 'Utilities'
  | 'Healthcare'
  | 'Salary'
  | 'Gifts'
  | 'Side Hustle'
  | 'Savings';

export interface Budget {
  category: TransactionCategory;
  limit: number;
  spent: number;
}

export interface MonthData {
  year: number;
  month: number; // 0-11
  income: number;
  expenses: number;
  transactions: Transaction[];
  budgets: Budget[];
}