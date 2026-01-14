import { useState } from "react";

const MemberForm = ({ members, setMembers }) => {
  const [memberName, setMemberName] = useState("");

  const addMember = () => {
    if (!memberName.trim()) return;

    setMembers([...members, memberName.trim()]);
    setMemberName("");
  };

  return (
    <div>
      <h3>Members</h3>

      <input
        type="text"
        placeholder="Member name"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      />

      <button onClick={addMember}>Add</button>

      <ul>
        {members.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberForm;
