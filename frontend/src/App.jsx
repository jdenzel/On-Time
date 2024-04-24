import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ACCESS_TOKEN } from "./constants"
import Login from './pages/Login'
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"
import NavBar from "./components/Navbar"
import TimeSheet from "./pages/TimeSheet"

function App() {
  
  function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet"
          element={
            <ProtectedRoute>
              <TimeSheet />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterAndLogout /></GuestRoute>} />
        <Route path="*" element={<GuestRoute><NotFound /></GuestRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
