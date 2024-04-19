import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import NavBar from "./components/Navbar"
import TimeSheet from "./pages/TimeSheet"

function App() {

  function Logout() {
    localStorage.clear()
    return <Navigate to='/login' />
  }
  
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
          path='/timesheet' 
            element={
              <ProtectedRoute>
                <TimeSheet />
              </ProtectedRoute>
              } 
        />
        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/register' element={<RegisterAndLogout />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
