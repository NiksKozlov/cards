import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import defaultAva from '../../../assets/images/defaultAva.png'
import { useAppSelector } from '../../hooks/useAppSelector'
import { PATH } from '../../routePaths/routePaths.enum'
import { userAva, userName } from '../../selectors/profile-selector'

import s from './Navbar.module.css'

type PropsType = {
  isLoggedIn: boolean
}

export const Navbar: FC<PropsType> = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  const profileName = useAppSelector(userName)
  const profileAva = useAppSelector(userAva)

  const profileBtnHandler = () => {
    navigate(PATH.PROFILE)
  }

  const singInBtnHandler = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.navbarContainer}>
      <div>image</div>
      {isLoggedIn ? (
        <div>
          {profileName}
          <img
            className={s.navAva}
            onClick={profileBtnHandler}
            src={profileAva ? profileAva : defaultAva}
            alt="profile photo"
          />
        </div>
      ) : (
        <button className={s.navBtn} type={'submit'} color={'primary'} onClick={singInBtnHandler}>
          Sign in
        </button>
      )}
    </div>
  )
}
