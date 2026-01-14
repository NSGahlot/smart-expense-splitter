import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const GroupPage = () => {
  const { groupId } = useParams();
  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId)
  );

  if (!group) return <h2>Group not found</h2>;

  return (
    <div>
      <h1>{group.name}</h1>

      <ExpenseForm group={group} />
      <ExpenseList expenses={group.expenses} />
    </div>
  );
};

export default GroupPage;
