import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
