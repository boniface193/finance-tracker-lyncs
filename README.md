# Finance Flow - Personal Finance Tracker

A beautiful, intuitive personal finance dashboard built with React and Tailwind CSS. Track your income, expenses, and budgets with ease.

## ✨ Features

- **Smart Dashboard** - Get a quick overview of your financial health
- **Transaction Management** - Add, view, and delete transactions seamlessly
- **Budget Tracking** - Set category budgets and monitor your spending
- **Visual Insights** - Interactive charts to understand spending patterns
- **Monthly Navigation** - Browse through different months to track progress
- **Persistent Data** - All data saved locally in your browser

## 🎨 Design Choices

I focused on creating a calm, trustworthy financial experience:

- **Soft dark theme & shadows** - Creates a premium, approachable feel, dark theme reduces eye strain in low-light
- **Micro-interactions** - Subtle animations make the app feel alive
- **Empty states** - Friendly guidance when no data exists
- **Responsive layout** - Works beautifully on all devices

## 🛠️ Tech Stack

- React 19 with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- date-fns for date manipulation
- Heroicons for beautiful icons
- LocalStorage for data persistence

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm start`
4. Build for production: `npm run build`

## 💡 What I'd Improve With More Time

1. **Data Export** - Allow users to download their transactions as CSV
2. **Recurring Transactions** - Support for monthly bills and subscriptions
3. **Goal Setting** - Let users set savings goals and track progress
4. **Light Mode** - Add theme switching for day
5. **Multi-currency Support** - Handle different currencies
6. **Charts Drill-down** - Click categories to see detailed breakdowns

## 🤔 Challenges Faced

The biggest challenge was designing the budget system to handle both predefined and custom categories while maintaining a clean UX. I solved this by pre-populating with sensible defaults but allowing users to edit limits freely.

Another interesting challenge was making the date/month navigation feel natural - the month picker with automatic data loading creates a smooth browsing experience.

## ⏱️ Time Spent

Approximately 12 hours spread over 3 days:
- Planning & Setup: 3 hours
- Core Components: 4 hours
- Polish & Animations: 3 hours
- Testing & Documentation: 2 hours

## 📱 Live Demo

[\[Deploy to Netlify\]](https://track-fina.netlify.app/)

---

Built with ❤️ for the Frontend Developer Evaluation