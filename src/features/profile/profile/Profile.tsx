import React, { useCallback } from 'react'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
import { Navigate } from 'react-router-dom'

import defaultAva from '../../../assets/images/defaultAva.png'
import { BackToPacksList } from '../../../common/components/backToPacksList/BackToPacksList'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { EditableName } from '../EditableName/EditableName'

import { changeProfileNameTC, logOutTC } from './profile-reducer'
import s from './Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.profile)

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
        <img
          className={s.ava}
          src={profile.avatar ? profile.avatar : defaultAva}
          alt="profile photo"
        />
        <AddAPhotoIcon
          sx={{ position: 'absolute', top: '360px', left: '728px', color: 'grey' }}
          fontSize={'large'}
        />
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
