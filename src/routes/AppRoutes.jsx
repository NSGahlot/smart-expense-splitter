import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GroupPage from "../pages/GroupPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/group/:groupId" element={<GroupPage />} />
    </Routes>
  );
};

export default AppRoutes;
