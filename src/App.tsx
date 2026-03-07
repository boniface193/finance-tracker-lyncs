import './global.css';  
import React, { useState, useEffect } from 'react';
import { PlusIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';
import BudgetProgress from './components/BudgetProgress';
import AddTransactionModal from './components/AddTransactionModal';
import MonthlySummary from './components/MonthlySummary';
import { Transaction, Budget, MonthData } from './types';
import { getCurrentMonthData, saveMonthData, calculateTotals } from './utils/storage';

function App() {
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    loadMonthData();
  }, [selectedMonth]);

  const loadMonthData = () => {
    const data = getCurrentMonthData(selectedMonth);
    setMonthData(data);
  };

  const handleAddTransaction = (transaction: Transaction) => {
    if (!monthData) return;

    const updatedData = {
      ...monthData,
      transactions: [...monthData.transactions, transaction],
      ...calculateTotals([...monthData.transactions, transaction])
    };

    setMonthData(updatedData);
    saveMonthData(selectedMonth, updatedData);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    if (!monthData) return;

    const filteredTransactions = monthData.transactions.filter(t => t.id !== id);
    const updatedData = {
      ...monthData,
      transactions: filteredTransactions,
      ...calculateTotals(filteredTransactions)
    };

    setMonthData(updatedData);
    saveMonthData(selectedMonth, updatedData);
  };

  const handleUpdateBudget = (categoryBudgets: Budget[]) => {
    if (!monthData) return;

    const updatedData = {
      ...monthData,
      budgets: categoryBudgets
    };

    setMonthData(updatedData);
    saveMonthData(selectedMonth, updatedData);
  };

  if (!monthData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-bg-primary text-gray-900">
      {/* Header with subtle animation */}
      <header className="bg-bg-primary shadow-sm border-b border-bg-tertiary sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex sm:flex-row flex-col items-center justify-between">
            <div className="flex items-center space-x-3 animate-slide-in">
              <div className="p-2 bg-accent-1 rounded-xl">
                <CurrencyDollarIcon className="h-8 w-8 text-white/70" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white/70">Finance Flow</h1>
                <p className="text-sm text-gray-300">Track your money, achieve your goals</p>
              </div>
            </div>

            {/* Month selector with smooth transitions */}
            <div className="flex sm:flex-row flex-col items-center sm:space-x-4 mt-4 sm:mt-0 sm:w-auto w-full animate-fade-in">
              <input
                type="month"
                value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
                onChange={(e) => {
                  const [year, month] = e.target.value.split('-');
                  setSelectedMonth(new Date(parseInt(year), parseInt(month) - 1));
                }}
                className="px-4 py-2 border border-bg-tertiary rounded-xl focus:ring-2 focus:ring-accent-1 focus:border-transparent transition-all w-full sm:w-auto"
              />

              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center px-6 py-3 bg-accent-1 text-white font-medium rounded-xl hover:bg-accent-2 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-1 shadow-lg hover:shadow-xl w-full sm:w-auto mt-4 sm:mt-0"
              >
                <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards with hover effects */}
        <MonthlySummary monthData={monthData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spending Chart Card */}
            <div className="bg-bg-secondary rounded-2xl shadow-sm border border-bg-tertiary p-6 hover:shadow-md transition-all duration-300 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white/70">Spending Overview</h2>
                <ChartBarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <SpendingChart transactions={monthData.transactions} />
            </div>

            {/* Recent Transactions Card */}
            <div className="bg-bg-secondary rounded-2xl shadow-sm border border-bg-tertiary p-6 hover:shadow-md transition-all duration-300">
              <h2 className="text-lg font-semibold text-white/70 mb-4">Recent Transactions</h2>
              <TransactionList
                transactions={monthData.transactions.slice(-5).reverse()}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </div>

          {/* Right Column - Budget Progress */}
          <div className="space-y-8">
            <div className="bg-bg-secondary rounded-2xl shadow-sm border border-bg-tertiary p-6 hover:shadow-md transition-all duration-300">
              <h2 className="text-lg font-semibold text-white/70 mb-4">Budget Overview</h2>
              <BudgetProgress
                budgets={monthData.budgets}
                transactions={monthData.transactions}
                onUpdateBudget={handleUpdateBudget}
              />
            </div>
          </div>
        </div>
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
}

export default App;