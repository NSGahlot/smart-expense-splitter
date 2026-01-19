import { calculateMemberSummary } from "../features/groups/groupUtils";
import "./MemberSummary.css";

const MemberSummary = ({ group, setSelectedMember }) => {
  const summary = calculateMemberSummary(group);

  return (
    <div className="member-summary">
      <h3>Member Summary</h3>

      <table className="member-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Paid</th>
            <th>Share</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([name, d]) => {
            const net = d.paid - d.share;
            return (
              <tr key={name}>
                <td
                  className="member-name"
                  onClick={() => setSelectedMember(name)}
                >
                  {name}
                </td>
                <td>₹{d.paid.toFixed(0)}</td>
                <td>₹{d.share.toFixed(0)}</td>
                <td className={net >= 0 ? "net-positive" : "net-negative"}>
                  {net >= 0 ? "+" : "-"}₹{Math.abs(net).toFixed(0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberSummary;
