import { useDispatch } from "react-redux";
import { resetAll } from "../features/groups/groupsSlice";
import GroupForm from "../components/GroupForm";

const Home = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure? All groups and expenses will be deleted."
    );

    if (confirmReset) {
      dispatch(resetAll());
      localStorage.clear();
    }
  };

  return (
    <div>
      <h1>Smart Expense Splitter</h1>

      <GroupForm />

      <button onClick={handleReset} style={{ marginTop: "20px" }}>
        Reset All Data
      </button>
    </div>
  );
};

export default Home;
