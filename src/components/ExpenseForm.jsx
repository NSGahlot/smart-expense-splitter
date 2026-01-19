import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/groups/groupsSlice";
import "./ExpenseForm.css";

const ExpenseForm = ({ group }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(group.members[0]);
  const [splitType, setSplitType] = useState("equal");
  const [customSplit, setCustomSplit] = useState({});
  const dispatch = useDispatch();

  const handleCustomChange = (member, value) => {
    setCustomSplit({ ...customSplit, [member]: Number(value) });
  };

  const handleAddExpense = () => {
    if (!title || !amount) return;

    dispatch(
      addExpense({
        groupId: group.id,
        expense: {
          title,
          amount: Number(amount),
          paidBy,
          splitType,
          customSplit: splitType === "custom" ? customSplit : null,
        },
      })
    );

    setTitle("");
    setAmount("");
    setSplitType("equal");
    setCustomSplit({});
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
            <option key={m}>{m}</option>
          ))}
        </select>
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
