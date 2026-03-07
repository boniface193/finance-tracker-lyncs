import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { MonthData } from '../types';

interface Props {
  monthData: MonthData;
}

const MonthlySummary: React.FC<Props> = ({ monthData }) => {
  const savings = monthData.income - monthData.expenses;
  const savingsRate = monthData.income > 0 ? (savings / monthData.income) * 100 : 0;

  const stats = [
    {
      label: 'Total Income',
      value: monthData.income,
      change: '+12.5%', // This could be calculated from previous month
      icon: ArrowTrendingUpIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      label: 'Total Expenses',
      value: monthData.expenses,
      change: '-8.1%',
      icon: ArrowTrendingDownIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Savings',
      value: savings,
      change: `${savingsRate.toFixed(1)}%`,
      icon: BanknotesIcon,
      color: savings >= 0 ? 'text-blue-600' : 'text-orange-600',
      bgColor: savings >= 0 ? 'bg-blue-100' : 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-bg-secondary rounded-2xl shadow-sm border border-bg-tertiary p-6 hover:shadow-md transition-all duration-300 animate-slide-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 ${stat.bgColor} rounded-xl`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <span className="text-sm font-medium text-white/70">{stat.change}</span>
          </div>
          <p className="text-2xl font-bold text-white/70">${stat.value.toFixed(2)}</p>
          <p className="text-sm text-white/70 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default MonthlySummary;