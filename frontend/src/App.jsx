import React from "react"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store";
import api from "./api"
import Login from './pages/Login'
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"
import NavBar from "./components/Navbar"
import ClockIn from "./components/ClockIn";
import ClockOut from "./components/ClockOut";
import TimeLog from "./pages/TimeLog";
import './styles/background.css'


function MainApp() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  

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
              <TimeLog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clockin"
          element={
            <ProtectedRoute>
              <ClockIn date={date} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clockout"
          element={
            <ProtectedRoute>
              <ClockOut date={date} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="*" element={<GuestRoute><NotFound /></GuestRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
        <MainApp />
    </Provider>
  );
}

export default App
