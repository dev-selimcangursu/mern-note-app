import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import Settings from "../pages/Settings/Setting";
import Projects from "../pages/Settings/Project/Projects";
import AddProject from "../pages/Settings/Project/AddProject";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/project" element={<Projects />} />
      <Route path="/settings/project/add" element={<AddProject />} />
    </Routes>
  );
}
