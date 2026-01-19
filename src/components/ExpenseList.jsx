import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/groups/groupsSlice";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, groupId }) => {
  const dispatch = useDispatch();

  if (expenses.length === 0) {
    return <p>No expenses yet</p>;
  }

  return (
    <div className="expense-list">
      <h3>Expenses</h3>

      {expenses.map((e) => (
        <div key={e.id} className="expense-item">
          <div className="expense-info">
            <div>
              {e.title} – ₹{e.amount} (Paid by {e.paidBy})
            </div>

            <small style={{ color: "#666" }}>
              📅{" "}
              {e.date ? new Date(e.date).toDateString() : "Date not available"}
            </small>
          </div>

          <button
            className="delete-expense-btn"
            onClick={() =>
              dispatch(
                deleteExpense({
                  groupId,
                  expenseId: e.id,
                })
              )
            }
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
