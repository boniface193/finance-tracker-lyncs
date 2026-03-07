import React, { useMemo } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const categoryColors: Record<string, { color: string; light: string }> = {
  Housing: { color: '#3B82F6', light: '#BFDBFE' }, // blue
  Transportation: { color: '#10B981', light: '#A7F3D0' }, // green
  'Food & Dining': { color: '#F97316', light: '#FED7AA' }, // orange
  Entertainment: { color: '#8B5CF6', light: '#DDD6FE' }, // purple
  Shopping: { color: '#EC4899', light: '#FBCFE8' }, // pink
  Utilities: { color: '#EAB308', light: '#FEF08A' }, // yellow
  Healthcare: { color: '#EF4444', light: '#FECACA' }, // red
  Income: { color: '#6B7280', light: '#E5E7EB' }, // gray
};

const SpendingChart: React.FC<Props> = ({ transactions }) => {
  const chartData = useMemo(() => {
    // Filter only expenses and group by category
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {} as Record<string, number>);

    // Convert to array format for chart
    const data: ChartData[] = Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
      color: categoryColors[name]?.color || '#9CA3AF',
    }));

    // Sort by value descending
    return data.sort((a, b) => b.value - a.value);
  }, [transactions]);

  const totalSpent = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalSpent) * 100).toFixed(1);

      return (
        <div className="bg-bg-secondary px-4 py-3 rounded-xl shadow-lg border border-bg-tertiary animate-fade-in">
          <p className="font-medium text-gray-200">{data.name}</p>
          <p className="text-lg font-semibold text-gray-200">
            ${data.value.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {payload.map((entry: any, index: number) => {
          const percentage = ((entry.payload.value / totalSpent) * 100).toFixed(1);

          return (
            <li
              key={`item-${index}`}
              className="flex items-center space-x-2 text-sm group cursor-pointer"
            >
              <span
                className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
                {entry.value}
              </span>
              <span className="text-gray-500 text-xs">
                ({percentage}%)
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center flex-col animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <p className="text-gray-500">No expense data to visualize</p>
        <p className="text-sm text-gray-400 mt-1">Add some expenses to see your spending breakdown</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Total Spent Summary */}
      <div className="flex justify-between items-center p-4 bg-bg-secondary rounded-xl">
        <span className="text-gray-400">Total Spent</span>
        <span className="text-2xl font-bold text-gray-200">${totalSpent.toFixed(2)}</span>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="white"
                  strokeWidth={2}
                  className="transition-all duration-300 hover:opacity-80 hover:scale-105"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="p-3 bg-bg-tertiary rounded-xl">
          <p className="text-xs text-blue-600 font-medium">Top Category</p>
          <p className="font-semibold text-gray-200">{chartData[0]?.name || '-'}</p>
          <p className="text-sm text-gray-400">${chartData[0]?.value.toFixed(2) || '0'}</p>
        </div>
        <div className="p-3 bg-bg-tertiary rounded-xl">
          <p className="text-xs text-purple-600 font-medium">Categories</p>
          <p className="font-semibold text-gray-200">{chartData.length}</p>
          <p className="text-sm text-gray-400">with expenses</p>
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;