import { useState } from "react";
import "./MemberForm.css";

const MemberForm = ({ members, setMembers }) => {
  const [memberName, setMemberName] = useState("");

  const addMember = () => {
    if (!memberName.trim()) return;
    setMembers([...members, memberName.trim()]);
    setMemberName("");
  };

  return (
    <div className="member-form">
      <h4>Members</h4>

      <input
        className="member-input"
        type="text"
        placeholder="Member name"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      />

      <button className="add-member-btn" onClick={addMember}>
        Add
      </button>

      <ul className="member-list">
        {members.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberForm;
