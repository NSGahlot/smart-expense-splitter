import {
  calculateBalances,
  simplifyBalances,
} from "../features/groups/groupUtils";
import "./BalanceSummary.css";

const BalanceSummary = ({ group }) => {
  if (group.expenses.length === 0) {
    return (
      <p className="balance-empty">
        No balances yet. Add expenses to see summary.
      </p>
    );
  }

  const balances = calculateBalances(group);
  const settlements = simplifyBalances(balances);

  return (
    <div className="balance-summary">
      <h3>Balance Summary</h3>

      {settlements.length === 0 ? (
        <p className="balance-empty">All settled 🎉</p>
      ) : (
        <ul className="balance-list">
          {settlements.map((s, index) => (
            <li key={index} className="balance-item">
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BalanceSummary;
