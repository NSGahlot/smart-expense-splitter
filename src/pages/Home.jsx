import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupForm from "../components/GroupForm";

const Home = () => {
  const groups = useSelector((state) => state.groups.groups);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Smart Expense Splitter</h1>

      {groups.length > 0 && (
        <>
          <h2>Your Groups</h2>
          <ul>
            {groups.map((g) => (
              <li key={g.id}>
                <button onClick={() => navigate(`/group/${g.id}`)}>
                  {g.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <hr />

      <GroupForm />
    </div>
  );
};

export default Home;
