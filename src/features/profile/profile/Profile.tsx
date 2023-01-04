import React, { useCallback } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { BackToPacksList } from '../../../common/components/backToPacksList/BackToPacksList'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { userIsLoggedIn } from '../../../common/selectors/auth-selector'
import { userProfile } from '../../../common/selectors/profile-selector'
import { EditableName } from '../EditableName/EditableName'

import { InputTypeFileAva } from './inputTypeFileAva/InputTypeFileAva'
import { changeProfileNameTC, logOutTC } from './profile-reducer'
import s from './Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(userIsLoggedIn)
  const profile = useAppSelector(userProfile)

  const logOut = () => {
    dispatch(logOutTC())
  }

  const changeProfileName = useCallback(function (name: string) {
    dispatch(changeProfileNameTC(name))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.mainContainer}>
      <BackToPacksList />
      <div className={s.formContainer}>
        <h1>Personal information</h1>
        <InputTypeFileAva />
        <div className={s.name}>
          <EditableName name={profile.name} onChange={changeProfileName} />
        </div>
        <br />
        <div className={s.email}>{profile.email}</div>
        <button className={s.submitBtn} onClick={logOut}>
          <IconButton size={'small'}>
            <LogoutIcon fontSize={'small'} />
            Log Out
          </IconButton>
        </button>
      </div>
    </div>
  )
}
