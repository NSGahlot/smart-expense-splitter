// Expense Categories with Icons
export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Food & Dining", icon: "🍔" },
  { id: "transport", label: "Transportation", icon: "🚗" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "bills", label: "Bills & Utilities", icon: "📄" },
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "health", label: "Health & Medical", icon: "💊" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "rent", label: "Rent & Housing", icon: "🏠" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "sports", label: "Sports & Fitness", icon: "⚽" },
  { id: "gifts", label: "Gifts", icon: "🎁" },
  { id: "other", label: "Other", icon: "📌" },
];

export const getCategoryById = (id) => {
  return (
    EXPENSE_CATEGORIES.find((cat) => cat.id === id) ||
    EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1]
  );
};
