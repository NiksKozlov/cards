import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../routePaths/routePaths.enum'

import s from './Navbar.module.css'

export const Navbar = () => {
  const navigate = useNavigate()

  const profileBtnHandler = () => {
    navigate(PATH.PROFILE)
  }

  const packsBtnHandler = () => {
    navigate(PATH.PACKS_LIST)
  }

  return (
    <div className={s.navbarContainer}>
      <div>image</div>
      {/*<button className={s.navBtn} type={'submit'} color={'primary'}>*/}
      {/*  Sign in*/}
      {/*</button>*/}
      <button className={s.navBtnPacks} type={'submit'} onClick={packsBtnHandler}>
        Packs list
      </button>
      <button className={s.navBtnProfile} type={'submit'} onClick={profileBtnHandler}>
        Profile
      </button>
    </div>
  )
}
