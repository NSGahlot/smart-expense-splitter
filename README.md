# Smart Expense Splitter

A modern, mobile-first expense splitting application inspired by Splitwise. Easily manage group expenses, split bills fairly, and track who owes whom.

## 🚀 Live Demo

**[Visit the App](https://smart-expense-splitter-7pkdz5jlw.vercel.app)**

## ✨ Features

- **Group Management**: Create groups and add multiple members
- **Expense Tracking**: Add expenses with title, amount, date, and payer
- **Flexible Splitting**:
  - Equal split among all members
  - Custom split with specific amounts per member
- **Real-time Calculations**: Automatic balance calculations and settlement suggestions
- **Member Summary**: View detailed breakdown of who paid what and who owes what
- **Search & Filter**: Filter expenses by title, member, or date
- **Data Persistence**: All data is automatically saved to your browser's localStorage
- **Responsive Design**: Optimized for mobile and desktop devices
- **Modern UI**: Clean, intuitive interface inspired by Splitwise

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Styling**: CSS3 with mobile-first responsive design
- **Storage**: Browser LocalStorage for data persistence
- **Deployment**: Vercel

## 📋 Project Structure

```
src/
├── app/
│   ├── store.js                 # Redux store configuration
│   └── localStorage.js          # LocalStorage utilities
├── components/
│   ├── ExpenseForm.jsx          # Add expense form
│   ├── ExpenseList.jsx          # Display expenses
│   ├── GroupForm.jsx            # Create group form
│   ├── MemberForm.jsx           # Add members form
│   ├── MemberSummary.jsx        # Member breakdown table
│   ├── BalanceSummary.jsx       # Settlement suggestions
│   └── MemberExpenses.jsx       # Individual member expenses
├── features/
│   └── groups/
│       ├── groupsSlice.js       # Redux slice for groups
│       └── groupUtils.js        # Balance calculation utilities
├── pages/
│   ├── Home.jsx                 # Home page with groups list
│   └── GroupPage.jsx            # Individual group management
├── routes/
│   └── AppRoutes.jsx            # Route configuration
├── App.jsx                      # Main app component
└── index.css                    # Global styles
```

## 🎯 Key Functionalities

### 1. **Create Groups**

- Add group name
- Add multiple members (minimum 2 required)
- Start tracking expenses immediately

### 2. **Add Expenses**

- Enter expense title and amount
- Select who paid
- Choose split type (equal or custom)
- Optionally set custom amounts for each member
- Automatic date tracking

### 3. **View Balances**

- Real-time settlement calculations
- See who owes whom and how much
- Member-wise expense breakdown
- Visual indicators for positive/negative balances

### 4. **Manage Data**

- Search and filter expenses
- Delete individual expenses
- Rename groups
- Reset all data with confirmation

## 🎨 Design Features

- **Mobile-First**: Optimized for small screens with responsive layouts
- **Modern UI**: Card-based design with smooth transitions
- **Color Scheme**: Professional blue theme with supporting colors
- **Typography**: Clean hierarchy with readable fonts
- **Accessibility**: Proper contrast and touch-friendly buttons

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# 3. Install dependencies
npm install
```

### Running Locally

1. Navigate to the project directory
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open your browser to `http://localhost:5173`

## 📊 How It Works

### Balance Calculation Algorithm

The app uses a sophisticated algorithm to calculate who owes whom:

1. **Track Payments**: Record who paid for each expense
2. **Calculate Shares**: Determine each member's share based on split type
3. **Balance Tracking**: Maintain balance for each member (positive = owed money, negative = owes money)
4. **Settlement Optimization**: Simplify the settlement to minimum required transactions

### Example

**Scenario:**

- Alice paid ₹300 (split equally among 3)
- Bob paid ₹600 (split equally among 3)

**Calculation:**

- Alice: Paid ₹300, Owes ₹200 (300 / 3) → Net: +₹100
- Bob: Paid ₹600, Owes ₹200 (600 / 3) → Net: +₹200
- Charlie: Paid ₹0, Owes ₹300 (100 + 200) → Net: -₹300

**Settlement:** Charlie pays Alice ₹100, Charlie pays Bob ₹200

## 💾 Data Storage

All data is stored locally in your browser using LocalStorage. This means:

- ✅ Data persists across browser sessions
- ✅ No backend server needed
- ✅ Privacy - data never leaves your device
- ⚠️ Data is cleared if browser cache is cleared

## 🔄 State Management

Uses Redux Toolkit for efficient state management:

- Centralized application state
- Immutable state updates
- Automatic subscription to state changes
- Integrated with LocalStorage for persistence

## 🎯 Future Enhancements

- Cloud sync with backend database
- Multi-currency support
- Export reports (PDF/CSV)
- Dark mode theme
- QR code sharing for groups
- Direct payment integration
- Email notifications
- Recurring expenses

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Developed as a modern take on expense splitting for groups and friends.

---

**Built with ❤️ using React & Redux Toolkit**

**[Visit the Live App](https://smart-expense-splitter-7pkdz5jlw.vercel.app)**
