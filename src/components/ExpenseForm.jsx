import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/groups/groupsSlice";
import { addToast } from "../features/toast/toastSlice";
import { EXPENSE_CATEGORIES } from "../utils/categories";
import "./ExpenseForm.css";

const ExpenseForm = ({ group }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(group?.members?.[0] || "");
  const [category, setCategory] = useState("other");
  const [splitType, setSplitType] = useState("equal");
  const [customSplit, setCustomSplit] = useState({});
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  if (!group) return null;

  const handleCustomChange = (member, value) => {
    setCustomSplit((prev) => ({
      ...prev,
      [member]: Number(value),
    }));
  };

  const handleAddExpense = () => {
    if (!title || !amount || !paidBy) {
      dispatch(
        addToast({
          message: "Please fill in all required fields",
          type: "error",
        }),
      );
      return;
    }

    dispatch(
      addExpense({
        groupId: group.id,
        expense: {
          title,
          amount: Number(amount),
          paidBy,
          category,
          splitType,
          customSplit: splitType === "custom" ? customSplit : null,
          date: new Date(expenseDate).toISOString(),
        },
      }),
    );

    dispatch(
      addToast({
        message: "Expense added successfully!",
        type: "success",
      }),
    );

    setTitle("");
    setAmount("");
    setSplitType("equal");
    setCustomSplit({});
    setCategory("other");
    setExpenseDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="expense-form">
      <h3>Add Expense</h3>

      <div className="expense-row">
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
      </div>

      <div className="expense-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />
      </div>

      <div className="split-options">
        <label>
          <input
            type="radio"
            checked={splitType === "equal"}
            onChange={() => setSplitType("equal")}
          />{" "}
          Equal Split
        </label>

        <label>
          <input
            type="radio"
            checked={splitType === "custom"}
            onChange={() => setSplitType("custom")}
          />{" "}
          Custom Split
        </label>
      </div>

      {splitType === "custom" &&
        group.members.map((m) => (
          <div key={m} className="custom-row">
            <span>{m}</span>
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => handleCustomChange(m, e.target.value)}
            />
          </div>
        ))}

      <button className="add-expense-btn" onClick={handleAddExpense}>
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
