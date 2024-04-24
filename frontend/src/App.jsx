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
// import TimeSheet from "./pages/TimeSheet"
import ClockIn from "./components/ClockIn";
import ClockOut from "./components/ClockOut";
import TimeSheet from "./components/TimeSheet"

function MainApp() {
  const [user, setUser] = useState({})
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    api.get('/api/user/')
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  
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
              <TimeSheet user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clockin"
          element={
            <ProtectedRoute>
              <ClockIn user={user} date={date} />
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
        <Route path="/register" element={<GuestRoute><RegisterAndLogout /></GuestRoute>} />
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
