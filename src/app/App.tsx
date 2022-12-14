import React from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ForgotPassword } from '../features/forgot-password/ForgotPassword'
import { Login } from '../features/login/Login'
import { NewPassword } from '../features/new-password/NewPassword'
import { Profile } from '../features/profile/Profile'
import { Register } from '../features/register/Register'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/reset-forgot-password'} element={<ForgotPassword />} />
        <Route path={'/new-forgot-password'} element={<NewPassword />} />
        <Route
          path={'/404'}
          element={<h1 style={{ textAlign: 'center' }}>404: PAGE NOT FOUND</h1>}
        />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}

export default App
