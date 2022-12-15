import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { ForgotPassword } from '../features/forgot-password/ForgotPassword'
import { meTC } from '../features/login/auth-reducer'
import { Login } from '../features/login/Login'
import { NewPassword } from '../features/new-password/NewPassword'
import { Profile } from '../features/profile/Profile'
import { Register } from '../features/register/Register'

import { RequestStatusType } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'

const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

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

  return (
    <div className="App">
      {status === 'loading' && <LinearProgress color="secondary" />}
      <ErrorSnackbar />
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
