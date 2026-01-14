import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/groups/groupsSlice";

const ExpenseForm = ({ group }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(group.members[0]);
  const [splitType, setSplitType] = useState("equal");
  const [customSplit, setCustomSplit] = useState({});
  const dispatch = useDispatch();

  const handleCustomChange = (member, value) => {
    setCustomSplit({
      ...customSplit,
      [member]: Number(value),
    });
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

      <div>
        <label>
          <input
            type="radio"
            value="equal"
            checked={splitType === "equal"}
            onChange={() => setSplitType("equal")}
          />
          Equal Split
        </label>

        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            value="custom"
            checked={splitType === "custom"}
            onChange={() => setSplitType("custom")}
          />
          Custom Split
        </label>
      </div>

      {splitType === "custom" && (
        <div>
          <h4>Custom Split</h4>
          {group.members.map((m) => (
            <div key={m}>
              <label>{m}: </label>
              <input
                type="number"
                placeholder="Amount"
                onChange={(e) => handleCustomChange(m, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleAddExpense}>Add</button>
    </div>
  );
};

export default ExpenseForm;
