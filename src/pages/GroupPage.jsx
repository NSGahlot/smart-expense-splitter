import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BalanceSummary from "../components/BalanceSummary";
import MemberSummary from "../components/MemberSummary";
import {
  resetAll,
  renameGroup,
  deleteGroup,
} from "../features/groups/groupsSlice";
import "./GroupPage.css";

const GroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId)
  );

  if (!group) return <h2>Group not found</h2>;

  const handleRename = () => {
    const newName = prompt("New group name", group.name);
    if (newName) {
      dispatch(renameGroup({ groupId: group.id, newName }));
    }
  };

  const handleDelete = () => {
    if (window.confirm("Delete this group?")) {
      dispatch(deleteGroup(group.id));
      navigate("/");
    }
  };

  const handleReset = () => {
    if (window.confirm("Delete all data?")) {
      dispatch(resetAll());
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="group-container">
      {/* TOP BAR */}
      <div className="group-topbar">
        <button onClick={() => navigate("/")}>⬅ Home</button>
        <button onClick={handleRename}>✏ Rename</button>
        <button className="danger-btn" onClick={handleDelete}>
          Delete Group
        </button>
        <button className="danger-btn" onClick={handleReset}>
          Reset All
        </button>
      </div>

      <h1 className="group-title">{group.name}</h1>

      {/* ADD EXPENSE */}
      <div className="section-card">
        <ExpenseForm group={group} />
      </div>

      {/* EXPENSE LIST */}
      <div className="section-card">
        <ExpenseList expenses={group.expenses} groupId={group.id} />
      </div>

      {/* BALANCE */}
      <div className="section-card">
        <BalanceSummary group={group} />
      </div>

      {/* MEMBER SUMMARY */}
      <div className="section-card">
        <MemberSummary group={group} />
      </div>
    </div>
  );
};

export default GroupPage;
