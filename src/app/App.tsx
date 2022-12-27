import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Navbar } from '../common/components/navbar/Navbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { PATH } from '../common/routePaths/routePaths.enum'
import { CheckEmail } from '../features/auth/check-email/CheckEmail'
import { ForgotPassword } from '../features/auth/forgot-password/ForgotPassword'
import { meTC } from '../features/auth/login/auth-reducer'
import { Login } from '../features/auth/login/Login'
import { NewPassword } from '../features/auth/new-password/NewPassword'
import { Register } from '../features/auth/register/Register'
import { CardsList } from '../features/cards/cardList/CardsList'
import { PacksFilterButtons } from '../features/packs/packsFilterButtons/PacksFilterButtons'
import { PacksList } from '../features/packs/packsList/PacksList'
import { PacksPagination } from '../features/packs/pagination/PacksPagination'
import SearchField from '../features/packs/searchField/SearchField'
import { Profile } from '../features/profile/profile/Profile'

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
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.PACKS_LIST} element={<PacksList />} />
          <Route path={PATH.CARDS_LIST} element={<CardsList />} />
        </Route>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.NEW_PASSWORD_TOKEN} element={<NewPassword />} />
        {/*-------------------------test----------------------*/}
        <Route path={'/packs-filter'} element={<PacksFilterButtons />} />
        <Route path={'/pagination'} element={<PacksPagination />} />
        <Route path={'/search'} element={<SearchField />} />
        {/*-------------------------test----------------------*/}
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
