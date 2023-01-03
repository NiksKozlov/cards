import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
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
      <Navbar isLoggedIn={isLoggedIn} />
      {status === 'loading' && <LinearProgress color="secondary" />}
      <ErrorSnackbar />
      <RoutePaths isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
