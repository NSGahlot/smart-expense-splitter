const MemberExpenses = ({ group, member }) => {
  const relatedExpenses = group.expenses.filter((e) => {
    // Paid by member
    if (e.paidBy === member) return true;

    // Equal split → all members involved
    if (e.splitType === "equal") return true;

    // Custom split
    if (e.customSplit && e.customSplit[member] > 0) return true;

    return false;
  });

  if (relatedExpenses.length === 0) {
    return <p>No expenses for {member}</p>;
  }

  return (
    <div>
      <h3>Expenses for {member}</h3>

      {relatedExpenses.map((e) => (
        <div key={e.id} style={{ marginBottom: "10px" }}>
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
