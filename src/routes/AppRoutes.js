import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import AdminManagement from "../pages/AdminManagement";
import Login from "../auth/Login";
// import ReportTaskList from "../pages/ReportTaskList";
// import ReportUser from "../pages/ReportUser";
// import Roles from "../pages/Roles";
// import Permissions from "../pages/Permissions";
// import UserManagement from "../pages/UserManagement";
// import TaskManagement from "../pages/TaskManagement";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminManagement />} />
          {/* <Route path="/tasks" element={<ReportTaskList />} />
          <Route path="/users" element={<ReportUser />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/task-management" element={<TaskManagement />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
