import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/groups/groupsSlice";
import { addToast } from "../features/toast/toastSlice";
import { getCategoryById } from "../utils/categories";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, groupId }) => {
  const dispatch = useDispatch();

  if (expenses.length === 0) {
    return <p>No expenses yet</p>;
  }

  const handleDelete = (expenseId, title) => {
    dispatch(
      deleteExpense({
        groupId,
        expenseId,
      }),
    );
    dispatch(
      addToast({
        message: `Deleted: ${title}`,
        type: "info",
      }),
    );
  };

  return (
    <div className="expense-list">
      <h3>Expenses</h3>

      {expenses.map((e) => {
        const category = getCategoryById(e.category);
        return (
          <div key={e.id} className="expense-item">
            <div className="expense-icon">{category.icon}</div>
            <div className="expense-info">
              <div className="expense-title">
                {e.title} – ₹{e.amount}
              </div>
              <div className="expense-meta">
                <small>Paid by {e.paidBy}</small>
                <small>
                  {e.date
                    ? new Date(e.date).toDateString()
                    : "Date not available"}
                </small>
              </div>
            </div>

            <button
              className="delete-expense-btn"
              onClick={() => handleDelete(e.id, e.title)}
            >
              ❌
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
