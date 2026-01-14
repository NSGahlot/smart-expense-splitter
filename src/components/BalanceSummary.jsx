import {
  calculateBalances,
  simplifyBalances,
} from "../features/groups/groupUtils";

const BalanceSummary = ({ group }) => {
  const balances = calculateBalances(group);
  const settlements = simplifyBalances(balances);

  if (group.expenses.length === 0) return null;

  return (
    <div>
      <h3>Balance Summary</h3>

      {settlements.length === 0 ? (
        <p>All settled 🎉</p>
      ) : (
        <ul>
          {settlements.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BalanceSummary;
