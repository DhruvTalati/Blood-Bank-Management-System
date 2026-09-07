import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Inventory from "./pages/Inventory";
import Requests from "./pages/Requests";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED APPLICATION */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/donors" element={<Donors />} />

          <Route path="/donors/register" element={<Registration />} />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/requests" element={<Requests />} />

          <Route path="/users" element={<Users />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* DEFAULT */}

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* INVALID URL */}

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
