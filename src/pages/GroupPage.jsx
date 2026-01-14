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
    const confirmReset = window.confirm(
      "This will delete all groups and expenses. Continue?"
    );

    if (confirmReset) {
      dispatch(resetAll());
      localStorage.clear();
      navigate("/");
    }
  };

  if (!group) return <h2>Group not found</h2>;

  return (
    <div>
      <h1>{group.name}</h1>

      <button onClick={handleReset} style={{ marginBottom: "20px" }}>
        Reset All Data
      </button>

      <ExpenseForm group={group} />
      <ExpenseList expenses={group.expenses} groupId={groupId} />
      <BalanceSummary group={group} />
    </div>
  );
};

export default GroupPage;
