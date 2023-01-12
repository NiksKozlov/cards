import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { useLocation } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/errorSnackbar/ErrorSnackbar'
import { Navbar } from '../common/components/navbar/Navbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { meTC } from '../features/auth/login/auth-reducer'

import { RoutePaths } from './RoutePaths'

const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const status = useAppSelector(state => state.app.status)
  const { pathname } = useLocation()

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
      {pathname !== '/404' ? <Navbar isLoggedIn={isLoggedIn} /> : null}
      {status === 'loading' && <LinearProgress />}
      <ErrorSnackbar />
      <RoutePaths isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
