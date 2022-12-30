import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Navbar.module.css'

export const Navbar = () => {
  const navigate = useNavigate()

  const profileBtnHandler = () => {
    navigate('/')
  }

  const packsBtnHandler = () => {
    navigate('/packs-list')
  }

  return (
    <div className={s.navbarContainer}>
      <div>image</div>
      <button className={s.navBtn} type={'submit'} color={'primary'}>
        Sign in
      </button>
    </div>
  )
}
