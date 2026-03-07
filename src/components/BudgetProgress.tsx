import React, { useState, useMemo } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Budget, Transaction, TransactionCategory } from '../types';

interface Props {
  budgets: Budget[];
  transactions: Transaction[];
  onUpdateBudget: (budgets: Budget[]) => void;
}

const categoryIcons: Record<string, string> = {
  Housing: '🏠',
  Transportation: '🚗',
  'Food & Dining': '🍔',
  Entertainment: '🎮',
  Shopping: '🛍️',
  Utilities: '💡',
  Healthcare: '🏥',
  Income: '💰',
};

const BudgetProgress: React.FC<Props> = ({ budgets, transactions, onUpdateBudget }) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Calculate current spending for each budget category
  const budgetsWithSpending = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    return budgets.map(budget => {
      const spent = expenseTransactions
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...budget,
        spent,
        remaining: budget.limit - spent,
        percentage: budget.limit > 0 ? (spent / budget.limit) * 100 : 0,
      };
    }).filter(b => !['Salary', 'Gifts', 'Side Hustle', 'Savings'].includes(b.category)); // Filter out 'Salary','Gifts','Side Hustle','Savings' category from budget view
  }, [budgets, transactions]);

  const handleEditStart = (category: string, currentLimit: number) => {
    setEditingCategory(category);
    setEditValue(currentLimit.toString());
  };

  const handleEditSave = (category: string) => {
    const newLimit = parseFloat(editValue);
    if (!isNaN(newLimit) && newLimit >= 0) {
      const updatedBudgets = budgets.map(b =>
        b.category === category ? { ...b, limit: newLimit } : b
      );
      onUpdateBudget(updatedBudgets);
    }
    setEditingCategory(null);
  };

  const handleEditCancel = () => {
    setEditingCategory(null);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = (percentage: number, remaining: number) => {
    if (percentage >= 100) return 'Over budget!';
    if (percentage >= 80) return 'Getting close';
    if (remaining > 0) return `${remaining > 100 ? 'On track' : 'Watch spending'}`;
    return 'No budget set';
  };

  return (
    <div className="space-y-4">
      {/* Budget Summary Card */}
      <div className="p-4 bg-gradient-to-br from-indigo-500 to-accent-1 rounded-xl text-white shadow-lg animate-slide-in">
        <p className="text-indigo-100 text-sm">Monthly Budget Summary</p>
        <p className="text-2xl font-bold mt-1">
          ${budgetsWithSpending.reduce((sum, b) => sum + b.limit, 0).toFixed(2)}
        </p>
        <p className="text-indigo-100 text-sm mt-2">
          Total allocated across {budgetsWithSpending.length} categories
        </p>
      </div>

      {/* Budget List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {budgetsWithSpending.map((budget) => {
          const isEditing = editingCategory === budget.category;
          const statusColor = getStatusColor(budget.percentage);
          const statusText = getStatusText(budget.percentage, budget.remaining);
          const isOverBudget = budget.percentage >= 100;

          return (
            <div
              key={budget.category}
              className={`group p-4 bg-bg-secondary rounded-xl hover:bg-bg-tertiary transition-all animate-slide-in ${isOverBudget ? 'border-l-4 border-red-500' : ''
                }`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{categoryIcons[budget.category]}</span>
                  <span className="font-medium text-white/70">{budget.category}</span>
                  {isOverBudget && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                      ⚠️ Over
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 px-2 py-1 text-sm border border-bg-tertiary rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Limit"
                      autoFocus
                      min="0"
                      step="0.01"
                    />
                    <button
                      onClick={() => handleEditSave(budget.category)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-300">
                      ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleEditStart(budget.category, budget.limit)}
                      className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className={`font-medium ${budget.percentage >= 100 ? 'text-red-600' : 'text-green-600'
                    }`}>
                    {budget.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${statusColor} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                  />
                </div>

                {/* Status and Remaining */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{statusText}</span>
                  <span className={`text-xs font-medium ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {budget.remaining >= 0 ? 'Left: ' : 'Over: '}
                    ${Math.abs(budget.remaining).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-bg-tertiary rounded-xl">
        <p className="text-xs text-indigo-400 font-medium mb-1">💡 Budget Tips</p>
        <p className="text-xs text-gray-400">
          Click the pencil icon to adjust category limits. Keep an eye on categories above 80%!
        </p>
      </div>

      {/* Add custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default BudgetProgress;