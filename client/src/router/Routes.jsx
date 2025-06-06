import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
}
