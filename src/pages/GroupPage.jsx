import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BalanceSummary from "../components/BalanceSummary";
import MemberSummary from "../components/MemberSummary";
import MemberExpenses from "../components/MemberExpenses";

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

  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jumpDate, setJumpDate] = useState("");

  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId),
  );

  if (!group) return <p>Group not found</p>;

  const searchedExpenses = group.expenses.filter((e) => {
    const q = searchQuery.toLowerCase();

    return (
      e.title.toLowerCase().includes(q) ||
      e.paidBy.toLowerCase().includes(q) ||
      (e.date && new Date(e.date).toDateString().toLowerCase().includes(q))
    );
  });

  const finalExpenses = jumpDate
    ? searchedExpenses.filter(
        (e) =>
          e.date && new Date(e.date).toISOString().split("T")[0] === jumpDate,
      )
    : searchedExpenses;

  const handleRename = () => {
    const newName = prompt("New group name", group.name);
    if (newName) {
      dispatch(renameGroup({ groupId: group.id, newName }));
    }
  };

  const handleDelete = () => {
    if (window.confirm("Delete this group? This cannot be undone.")) {
      dispatch(deleteGroup(group.id));
      navigate("/");
    }
  };

  // const handleReset = () => {
  //   if (window.confirm("Delete all data? This cannot be undone.")) {
  //     dispatch(resetAll());
  //     localStorage.clear();
  //     navigate("/");
  //   }
  // };

  return (
    <div className="group-container">
      <div className="group-header">
        <h1 className="group-title">{group.name}</h1>

        <div className="group-topbar">
          <button onClick={() => navigate("/")} title="Go back to home">
            ⬅️ Back
          </button>
          <button onClick={handleRename} title="Rename this group">
            ✏️ Rename
          </button>
          <button
            className="danger-btn"
            onClick={handleDelete}
            title="Delete this group"
          >
            🗑️ Delete
          </button>
          {/* <button
            className="danger-btn"
            onClick={handleReset}
            title="Delete all data"
          >
            🔄 Reset All
          </button> */}
        </div>
      </div>

      <div className="group-content">
        <div className="section-card">
          <ExpenseForm group={group} />
        </div>

        {group.expenses.length > 0 && (
          <div className="section-card filter-card">
            <input
              type="text"
              className="filter-input"
              placeholder="🔍 Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <input
              type="date"
              className="filter-input"
              value={jumpDate}
              onChange={(e) => setJumpDate(e.target.value)}
            />
          </div>
        )}

        {finalExpenses.length > 0 && (
          <div className="section-card">
            <ExpenseList expenses={finalExpenses} groupId={group.id} />
          </div>
        )}

        {finalExpenses.length > 0 && (
          <div className="section-card">
            <BalanceSummary group={{ ...group, expenses: finalExpenses }} />
          </div>
        )}

        {finalExpenses.length > 0 && (
          <div className="section-card">
            <MemberSummary
              group={{ ...group, expenses: finalExpenses }}
              setSelectedMember={setSelectedMember}
            />
          </div>
        )}

        {selectedMember && finalExpenses.length > 0 && (
          <div className="section-card">
            <MemberExpenses
              group={{ ...group, expenses: finalExpenses }}
              member={selectedMember}
            />
          </div>
        )}

        {group.expenses.length === 0 && (
          <div className="section-card">
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3 className="empty-state-title">No Expenses Yet</h3>
              <p className="empty-state-text">
                Add your first expense to get started!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupPage;
