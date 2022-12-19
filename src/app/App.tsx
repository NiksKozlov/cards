import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { CheckEmail } from '../features/check-email/CheckEmail'
import { ForgotPassword } from '../features/forgot-password/ForgotPassword'
import { meTC } from '../features/login/auth-reducer'
import { Login } from '../features/login/Login'
import { Navbar } from '../features/navbar/Navbar'
import { NewPassword } from '../features/new-password/NewPassword'
import { Profile } from '../features/profile/Profile'
import { Register } from '../features/register/Register'

const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const status = useAppSelector(state => state.app.status)

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  const PrivateRoutes = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
  }

  return (
    <div className="App">
      <Navbar />
      {status === 'loading' && <LinearProgress color="secondary" />}
      <ErrorSnackbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={'/'} element={<Profile />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/reset-forgot-password'} element={<ForgotPassword />} />
        <Route path={'/check-email'} element={<CheckEmail />} />
        <Route path={'/new-forgot-password/:token'} element={<NewPassword />} />
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
