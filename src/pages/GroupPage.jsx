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
    state.groups.groups.find((g) => g.id === groupId)
  );

  if (!group) return <p>Group not found</p>;

  // 🔍 SEARCH FILTER
  const searchedExpenses = group.expenses.filter((e) => {
    const q = searchQuery.toLowerCase();

    return (
      e.title.toLowerCase().includes(q) ||
      e.paidBy.toLowerCase().includes(q) ||
      (e.date && new Date(e.date).toDateString().toLowerCase().includes(q))
    );
  });

  // 📅 DATE FILTER
  const finalExpenses = jumpDate
    ? searchedExpenses.filter(
        (e) =>
          e.date && new Date(e.date).toISOString().split("T")[0] === jumpDate
      )
    : searchedExpenses;

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
      {/* 🔝 TOP BAR */}
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

      {/* ➕ ADD EXPENSE */}
      <div className="section-card">
        <ExpenseForm group={group} />
      </div>

      {/* 🔍 SEARCH + DATE FILTER */}
      <div className="section-card">
        <input
          type="text"
          placeholder="Search expenses by title / member / date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <input
          type="date"
          value={jumpDate}
          onChange={(e) => setJumpDate(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      {/* 📋 EXPENSE LIST */}
      <div className="section-card">
        <ExpenseList expenses={finalExpenses} groupId={group.id} />
      </div>

      {/* ⚖ BALANCE */}
      <div className="section-card">
        <BalanceSummary group={{ ...group, expenses: finalExpenses }} />
      </div>

      {/* 👥 MEMBER SUMMARY */}
      <div className="section-card">
        <MemberSummary
          group={{ ...group, expenses: finalExpenses }}
          setSelectedMember={setSelectedMember}
        />
      </div>

      {/* 👤 MEMBER EXPENSES */}
      {selectedMember && (
        <div className="section-card">
          <MemberExpenses
            group={{ ...group, expenses: finalExpenses }}
            member={selectedMember}
          />
        </div>
      )}
    </div>
  );
};

export default GroupPage;
