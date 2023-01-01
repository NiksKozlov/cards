import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Navbar.module.css'

type PropsType = {
  isLoggedIn: boolean
}

export const Navbar: FC<PropsType> = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  const profileBtnHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.navbarContainer}>
      <div>image</div>
      {isLoggedIn && (
        <button className={s.navBtn} type={'submit'} color={'primary'} onClick={profileBtnHandler}>
          Profile
        </button>
      )}
    </div>
  )
}
