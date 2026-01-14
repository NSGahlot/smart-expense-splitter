import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/groups/groupsSlice";

const ExpenseForm = ({ group }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(group.members[0]);
  const dispatch = useDispatch();

  const handleAddExpense = () => {
    if (!title || !amount) return;

    dispatch(
      addExpense({
        groupId: group.id,
        expense: {
          title,
          amount: Number(amount),
          paidBy,
        },
      })
    );

    setTitle("");
    setAmount("");
  };

  return (
    <div>
      <h3>Add Expense</h3>

      <input
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
        {group.members.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button onClick={handleAddExpense}>Add</button>
    </div>
  );
};

export default ExpenseForm;
