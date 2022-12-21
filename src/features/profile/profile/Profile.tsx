import React, { useCallback, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { EditableName } from '../EditableName/EditableName'

import { changeProfileNameTC, logOutTC, meProfileTC } from './profile-reducer'
import s from './Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.profile.profile)

  useEffect(() => {
    const thunk = meProfileTC()

    dispatch(thunk)
  }, [])

  const logOut = () => {
    const thunk = logOutTC()

    dispatch(thunk)
  }

  const changeProfileName = useCallback(function (name: string) {
    const thunk = changeProfileNameTC(name)

    dispatch(thunk)
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <h1>Personal information</h1>
        <div>
          <img
            style={{ height: '100px' }}
            src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
            alt="profile photo"
          />
        </div>
        <div className={s.nameEmailTitle}>Name:</div>
        <div className={s.name}>
          <EditableName name={profile.name} onChange={changeProfileName} />
        </div>
        <br />
        <div className={s.nameEmailTitle}>Email:</div>
        <div className={s.email}>{profile.email}</div>
        <button className={s.submitBtn} onClick={logOut}>
          LogOut
        </button>
      </div>
    </div>
  )
}
