import React, { FC, memo } from 'react'

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { PATH } from '../common/routePaths/routePaths.enum'
import { CheckEmail } from '../features/auth/check-email/CheckEmail'
import { ForgotPassword } from '../features/auth/forgot-password/ForgotPassword'
import { Login } from '../features/auth/login/Login'
import { NewPassword } from '../features/auth/new-password/NewPassword'
import { Register } from '../features/auth/register/Register'
import { CardsList } from '../features/cards/cardList/CardsList'
import { Learn } from '../features/learn/Learn'
import { PacksList } from '../features/packs/packsList/PacksList'
import { Profile } from '../features/profile/profile/Profile'

type PropsType = {
  isLoggedIn: boolean
}

export const RoutePaths: FC<PropsType> = memo(({ isLoggedIn }) => {
  const PrivateRoutes = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS_LIST} element={<PacksList />} />
        <Route path={PATH.CARDS_LIST} element={<CardsList />} />
        <Route path={PATH.LEARN} element={<Learn />} />
      </Route>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD_TOKEN} element={<NewPassword />} />
      <Route path={'/404'} element={<h1 style={{ textAlign: 'center' }}>404: PAGE NOT FOUND</h1>} />
      <Route path={'*'} element={<Navigate to={'/404'} />} />
    </Routes>
  )
})
