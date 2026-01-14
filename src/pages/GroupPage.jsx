import { useParams } from "react-router-dom";

const GroupPage = () => {
  const { groupId } = useParams();

  return <h1>Group Page - {groupId}</h1>;
};

export default GroupPage;
