import React, { useCallback, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'

import { EditableName } from './EditableName/EditableName'
import { changeProfileNameTC, logOutTC, meTC } from './profile-reducer'
import s from './Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.profile.profile)

  useEffect(() => {
    const thunk = meTC()

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
    return <Navigate to={'/login'} />
  }

  // @ts-ignore
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
