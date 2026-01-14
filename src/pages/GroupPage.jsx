import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BalanceSummary from "../components/BalanceSummary";
import { resetAll } from "../features/groups/groupsSlice";

const GroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId)
  );

  const handleReset = () => {
    if (window.confirm("This will delete all groups and expenses. Continue?")) {
      dispatch(resetAll());
      localStorage.clear();
      navigate("/");
    }
  };

  if (!group) return <h2>Group not found</h2>;

  return (
    <div>
      {/* 🔥 NEW NAVIGATION BAR */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/")}>⬅️ Back to Home</button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset All Data
        </button>
      </div>

      <h1>{group.name}</h1>

      <ExpenseForm group={group} />
      <ExpenseList expenses={group.expenses} groupId={group.id} />
      <BalanceSummary group={group} />
    </div>
  );
};

export default GroupPage;
