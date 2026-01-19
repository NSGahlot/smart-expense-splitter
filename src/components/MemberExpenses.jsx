const MemberExpenses = ({ group, member }) => {
  const relatedExpenses = group.expenses.filter((e) => {
    if (e.paidBy === member) return true;
    if (e.splitType === "equal") return true;
    if (e.customSplit && e.customSplit[member] > 0) return true;
    return false;
  });

  if (relatedExpenses.length === 0) {
    return <p className="member-expense-empty">No expenses for {member}</p>;
  }

  return (
    <div className="member-expenses">
      <h3>Expenses for {member}</h3>

      {relatedExpenses.map((e) => (
        <div key={e.id} className="member-expense-item">
          <strong>{e.title}</strong> – ₹{e.amount}
          <br />
          <small>
            Paid by {e.paidBy} | 📅 {new Date(e.date).toDateString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MemberExpenses;
