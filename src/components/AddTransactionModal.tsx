import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Transaction, TransactionCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Transaction) => void;
}

const categories: TransactionCategory[] = [
  'Housing', 'Transportation', 'Food & Dining', 'Entertainment',
  'Shopping', 'Utilities', 'Healthcare'
];

const incomeCategories: TransactionCategory[] = ['Salary', 'Gifts', 'Side Hustle', 'Savings'];

const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transaction: Transaction = {
      id: uuidv4(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toISOString(),
      type,
    };

    onAdd(transaction);

    // Reset form
    setAmount('');
    setDescription('');
    setType('expense');
    setCategory('Food & Dining');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" >
      <div className="bg-bg-secondary rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all animate-slide-in" >
        <div className="flex items-center justify-between mb-4" >
          <h2 className="text-xl font-semibold text-white/70" > Add Transaction </h2>
          < button
            onClick={onClose}
            className="p-1 hover:bg-bg-tertiary rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        < form onSubmit={handleSubmit} className="space-y-4" >
          {/* Transaction Type Toggle */}
          < div className="flex p-1 bg-bg-tertiary rounded-xl" >
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${type === 'expense'
                ? 'bg-accent-1 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-500'
                }`
              }
              onClick={() => setType('expense')}
            >
              Expense
            </button>
            < button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${type === 'income'
                ? 'bg-accent-1 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-500'
                }`}
              onClick={() => setType('income')}
            >
              Income
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1" >
              Amount
            </label>
            < div className="relative" >
              <span className="absolute left-3 top-2 text-gray-400" > $ </span>
              < input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 border border-bg-tertiary bg-bg-tertiary rounded-xl focus:ring-2 text-gray-400 focus:ring-accent-1 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1" >
              Description
            </label>
            < input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-bg-tertiary bg-bg-tertiary rounded-xl focus:ring-2 focus:ring-accent-1 text-gray-400 focus:border-transparent transition-all"
              placeholder="What was this for?"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1" >
              Category
            </label>
            < select
              value={category}
              onChange={(e) => setCategory(e.target.value as TransactionCategory)}
              className="w-full text-gray-400 px-3 py-2 border border-bg-tertiary bg-bg-tertiary rounded-xl focus:ring-2 focus:ring-accent-1 focus:border-transparent transition-all"
            >
              {
                (type === 'expense' ? categories : incomeCategories).map((cat) => (
                  <option key={cat} value={cat} className="bg-bg-secondary text-gray-400" >
                    {cat}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1" >
              Date
            </label>
            < input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-bg-tertiary text-gray-400 bg-bg-tertiary rounded-xl focus:ring-2 focus:ring-accent-1 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-accent-1 text-white font-medium rounded-xl hover:bg-accent-2 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-1 shadow-lg"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;