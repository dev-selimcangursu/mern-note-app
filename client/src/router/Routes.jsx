import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth/Auth";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
}
