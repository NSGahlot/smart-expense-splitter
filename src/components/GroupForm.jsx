import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../features/groups/groupsSlice";
import { useNavigate } from "react-router-dom";
import MemberForm from "./MemberForm";
import "./GroupForm.css";

const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    if (!groupName || members.length < 2) {
      alert("Group name aur at least 2 members chahiye");
      return;
    }

    const action = dispatch(
      createGroup({
        name: groupName,
        members,
      })
    );

    navigate(`/group/${action.payload.id}`);
  };

  return (
    <div className="group-form">
      <h2>Create Group</h2>

      <input
        className="group-input"
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <MemberForm members={members} setMembers={setMembers} />

      <button className="create-btn" onClick={handleCreateGroup}>
        Create Group
      </button>
    </div>
  );
};

export default GroupForm;
