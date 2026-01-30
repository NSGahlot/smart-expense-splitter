import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GroupForm from "../components/GroupForm";
import { resetAll } from "../features/groups/groupsSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import { addToast } from "../features/toast/toastSlice";
import "./Home.css";

const Home = () => {
  const groups = useSelector((state) => state.groups.groups);
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalGroups = groups.length;
  const totalExpenses = groups.reduce((acc, g) => acc + g.expenses.length, 0);
  const totalAmount = groups.reduce(
    (sum, g) => sum + g.expenses.reduce((s, e) => s + e.amount, 0),
    0,
  );

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    dispatch(resetAll());
    localStorage.clear();
    setShowConfirm(false);
    dispatch(
      addToast({
        message: "All data has been reset",
        type: "success",
      }),
    );
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    dispatch(
      addToast({
        message: `Switched to ${theme === "light" ? "dark" : "light"} mode`,
        type: "info",
      }),
    );
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <div>
            <h1 className="home-title">Smart Expense Splitter</h1>
            <p className="home-subtitle">Split expenses with ease</p>
          </div>
          <button
            className="theme-toggle"
            onClick={handleThemeToggle}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      <div className="home-content">
        <div className="stats-wrapper">
          <div className="stat-card">
            <h3>Groups</h3>
            <p>{totalGroups}</p>
          </div>

          <div className="stat-card">
            <h3>Expenses</h3>
            <p>{totalExpenses}</p>
          </div>

          <div className="stat-card">
            <h3>Total</h3>
            <p>₹{totalAmount}</p>
          </div>
        </div>

        {groups.length > 0 && (
          <div className="search-section">
            <input
              className="search-input"
              type="text"
              placeholder="🔍 Search groups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {groups.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h2 className="empty-state-title">No Groups Yet</h2>
            <p className="empty-state-text">
              Create your first group to start splitting expenses with friends.
            </p>
          </div>
        ) : (
          <div className="groups-section">
            <div className="section-header">
              <span className="section-title">Your Groups</span>
              <span className="section-count">{filteredGroups.length}</span>
            </div>
            {filteredGroups.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-text">No matching groups found</p>
              </div>
            ) : (
              <ul className="group-list">
                {filteredGroups.map((g) => {
                  const groupAmount = g.expenses.reduce(
                    (sum, e) => sum + e.amount,
                    0,
                  );
                  return (
                    <li key={g.id} className="group-item">
                      <div
                        className="group-item-content"
                        onClick={() => navigate(`/group/${g.id}`)}
                      >
                        <div className="group-item-info">
                          <div className="group-item-name">{g.name}</div>
                          <div className="group-item-meta">
                            <span>📝 {g.expenses.length} expenses</span>
                            <span>👥 {g.members.length} members</span>
                          </div>
                        </div>
                        <div
                          className={`group-item-amount ${groupAmount > 0 ? "positive" : "neutral"}`}
                        >
                          ₹{groupAmount}
                        </div>
                        <div className="group-item-action">→</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        <div className="home-actions">
          <button
            className="add-group-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add Group"}
          </button>
          {groups.length > 0 && (
            <button className="reset-btn" onClick={handleReset}>
              Reset All
            </button>
          )}
        </div>

        {showForm && <GroupForm />}

        {showConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-modal">
              <h3>⚠️ Confirm Reset</h3>
              <p>
                This will delete all groups and expenses. This cannot be undone.
              </p>
              <div className="confirm-actions">
                <button className="btn-danger" onClick={confirmReset}>
                  Yes, Delete All
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
