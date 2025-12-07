import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Singup from './pages/auth/Signup'

const App = () => {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />
  }

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />

        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App