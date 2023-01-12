import React, { useCallback } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Navigate } from 'react-router-dom'

import { BackToPacksList } from '../../../common/components/backToPacksList/BackToPacksList'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { userIsLoggedIn } from '../../../common/selectors/auth-selector'
import { userProfile } from '../../../common/selectors/profile-selector'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import { EditableName } from '../EditableName/EditableName'

import { CardsJoy } from './CardsJoy/CardsJoy'
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
      <div className={s.container}>
        <div className={s.formContainer}>
          <h1>Personal information</h1>
          <InputTypeFileAva />
          <div className={s.name}>
            <EditableName name={profile.name} onChange={changeProfileName} />
          </div>
          <div className={s.email}>{profile.email}</div>
          <CardsJoy packsCount={profile.publicCardPacksCount} />
          <UniButton className={'logoutBtn'} onClick={logOut} title={'Log out'}>
            <LogoutIcon fontSize={'small'} />
          </UniButton>
        </div>
      </div>
    </div>
  )
}
