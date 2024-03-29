import React, { FC, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { setAppErrorAC } from '../../../app/app-reducer'
import defaultAva from '../../../assets/images/defaultAva.jpg'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { PATH } from '../../routePaths/routePaths.enum'
import { userAva, userName } from '../../selectors/profile-selector'

import s from './Navbar.module.css'

type PropsType = {
  isLoggedIn: boolean
}

export const Navbar: FC<PropsType> = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const profileName = useAppSelector(userName)
  const avatar = useAppSelector(userAva)

  const profileBtnHandler = () => {
    navigate(PATH.PROFILE)
  }

  const singInBtnHandler = () => {
    navigate(PATH.LOGIN)
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    dispatch(setAppErrorAC('Something is wrong with the uploaded image.'))
  }

  const anotherExpression = avatar ? avatar : defaultAva

  return (
    <div className={s.navbarContainer}>
      <div className={s.nav}>
        <div className={s.buttonGroup}>
          <NavLink to={PATH.PACKS_LIST} className={s.titleContainer}>
            {'Magic Cards🦒'}
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div className={s.profileIcon} onClick={profileBtnHandler}>
            {profileName.toUpperCase()}
            <img
              className={s.navAva}
              src={isAvaBroken ? defaultAva : anotherExpression}
              onError={errorHandler}
              alt="profile photo"
            />
          </div>
        ) : (
          <button className={s.navBtn} type={'submit'} color={'primary'} onClick={singInBtnHandler}>
            Sign in
          </button>
        )}
      </div>
    </div>
  )
}
