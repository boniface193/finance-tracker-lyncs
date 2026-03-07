import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Transaction } from '../types';
import { format } from 'date-fns';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Housing: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Transportation: { bg: 'bg-green-100', text: 'text-green-700' },
  'Food & Dining': { bg: 'bg-orange-100', text: 'text-orange-700' },
  Entertainment: { bg: 'bg-purple-100', text: 'text-purple-700' },
  Shopping: { bg: 'bg-pink-100', text: 'text-pink-700' },
  Utilities: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Healthcare: { bg: 'bg-red-100', text: 'text-red-700' },
  Income: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <p className="text-gray-500">No transactions yet</p>
        <p className="text-sm text-gray-400 mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className="group flex items-center justify-between p-4 bg-bg-secondary rounded-xl hover:bg-bg-tertiary transition-all animate-slide-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-xl ${categoryColors[transaction.category]?.bg || 'bg-gray-200'} flex items-center justify-center`}>
              <span className={`text-lg ${categoryColors[transaction.category]?.text || 'text-gray-600'}`}>
                {transaction.category[0]}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-200">{transaction.description}</p>
              <p className="text-sm text-gray-400">
                {format(new Date(transaction.date), 'MMM d, yyyy')} • {transaction.category}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
              }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </span>

            <button
              onClick={() => onDelete(transaction.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-bg-tertiary rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Delete transaction"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;