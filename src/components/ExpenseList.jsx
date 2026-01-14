import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/groups/groupsSlice";

const ExpenseList = ({ expenses, groupId }) => {
  const dispatch = useDispatch();

  if (expenses.length === 0) return <p>No expenses yet</p>;

  return (
    <div>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.title} - ₹{e.amount} (Paid by {e.paidBy})
            <button
              onClick={() =>
                dispatch(
                  deleteExpense({
                    groupId,
                    expenseId: e.id,
                  })
                )
              }
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
