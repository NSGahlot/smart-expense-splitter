import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GroupForm from "../components/GroupForm";
import { resetAll } from "../features/groups/groupsSlice";
import "./Home.css";

const Home = () => {
  const groups = useSelector((state) => state.groups.groups);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // 🔢 Quick Stats
  const totalGroups = groups.length;
  const totalExpenses = groups.reduce((acc, g) => acc + g.expenses.length, 0);
  const totalAmount = groups.reduce(
    (sum, g) => sum + g.expenses.reduce((s, e) => s + e.amount, 0),
    0,
  );

  // 🔍 Search Filter
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleReset = () => {
    if (window.confirm("This will delete all groups and expenses. Continue?")) {
      dispatch(resetAll());
      localStorage.clear();
    }
  };

  return (
    <div className="home-container">
      {/* 🎨 HEADER WITH TITLE */}
      <div className="home-header">
        <h1 className="home-title">Smart Expense Splitter</h1>
        <p className="home-subtitle">Split expenses with ease</p>
      </div>

      {/* 📱 CONTENT AREA */}
      <div className="home-content">
        {/* 📊 DASHBOARD STATS */}
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

        {/* 🔍 SEARCH */}
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

        {/* 📂 GROUP LIST SECTION */}
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

        {/* 🎯 ACTION BUTTONS */}
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

        {/* ➕ CREATE GROUP FORM */}
        {showForm && <GroupForm />}
      </div>
    </div>
  );
};

export default Home;
