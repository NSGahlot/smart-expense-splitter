const ExpenseList = ({ expenses }) => {
  if (expenses.length === 0) return <p>No expenses yet</p>;

  return (
    <div>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.title} - ₹{e.amount} (Paid by {e.paidBy})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
