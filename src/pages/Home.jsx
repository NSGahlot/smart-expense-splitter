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

  // 🔢 Quick Stats
  const totalGroups = groups.length;
  const totalExpenses = groups.reduce((acc, g) => acc + g.expenses.length, 0);
  const totalAmount = groups.reduce(
    (sum, g) => sum + g.expenses.reduce((s, e) => s + e.amount, 0),
    0
  );

  // 🔍 Search Filter
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleReset = () => {
    if (window.confirm("This will delete all groups and expenses. Continue?")) {
      dispatch(resetAll());
      localStorage.clear();
    }
  };

  return (
    <div className="home-container">
      {/* 🔥 TITLE */}
      <h1 className="home-title">Smart Expense Splitter</h1>

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
          <h3>Total Amount</h3>
          <p>₹{totalAmount}</p>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      {groups.length > 0 && (
        <input
          className="search-input"
          type="text"
          placeholder="Search group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {/* 📂 GROUP LIST / EMPTY STATE */}
      {groups.length === 0 ? (
        <div className="empty-state">
          <p>
            No groups yet 👋 <br />
            Create your first group to start splitting expenses.
          </p>
        </div>
      ) : (
        <ul className="group-list">
          {filteredGroups.length === 0 ? (
            <p>No matching groups found</p>
          ) : (
            filteredGroups.map((g) => (
              <li key={g.id} className="group-item">
                <button
                  className="group-btn"
                  onClick={() => navigate(`/group/${g.id}`)}
                >
                  {g.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      <hr className="divider" />

      {/* ➕ CREATE GROUP */}
      <GroupForm />

      {/* 🧹 RESET */}
      {groups.length > 0 && (
        <button className="reset-btn" onClick={handleReset}>
          Reset All Data
        </button>
      )}
    </div>
  );
};

export default Home;
