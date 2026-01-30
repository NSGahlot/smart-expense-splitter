import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BalanceSummary from "../components/BalanceSummary";
import MemberSummary from "../components/MemberSummary";
import MemberExpenses from "../components/MemberExpenses";

import { renameGroup, deleteGroup } from "../features/groups/groupsSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import { addToast } from "../features/toast/toastSlice";
import { EXPENSE_CATEGORIES } from "../utils/categories";

import "./GroupPage.css";

const GroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jumpDate, setJumpDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId),
  );
  const theme = useSelector((state) => state.theme.mode);

  if (!group) return <p>Group not found</p>;

  const searchedExpenses = group.expenses.filter((e) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      e.title.toLowerCase().includes(q) ||
      e.paidBy.toLowerCase().includes(q) ||
      (e.date && new Date(e.date).toDateString().toLowerCase().includes(q));

    const matchesCategory =
      categoryFilter === "all" || e.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const finalExpenses = jumpDate
    ? searchedExpenses.filter(
        (e) =>
          e.date && new Date(e.date).toISOString().split("T")[0] === jumpDate,
      )
    : searchedExpenses;

  const handleRename = () => {
    const newName = prompt("New group name", group.name);
    if (newName && newName !== group.name) {
      dispatch(renameGroup({ groupId: group.id, newName }));
      dispatch(
        addToast({
          message: `Group renamed to "${newName}"`,
          type: "success",
        }),
      );
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteGroup(group.id));
    dispatch(
      addToast({
        message: `Group "${group.name}" deleted`,
        type: "info",
      }),
    );
    navigate("/");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="group-container">
      <div className="group-header">
        <div className="header-top">
          <h1 className="group-title">{group.name}</h1>
          <button
            className="theme-toggle"
            onClick={handleThemeToggle}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

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

            <div className="filter-row">
              <select
                className="filter-input"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="filter-input"
                value={jumpDate}
                onChange={(e) => setJumpDate(e.target.value)}
              />
            </div>
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

      {showDeleteConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3>⚠️ Delete Group?</h3>
            <p>
              This will permanently delete the group "{group.name}" and all its
              expenses. This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button className="btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
