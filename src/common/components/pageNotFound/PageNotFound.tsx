import React from 'react'

import { useNavigate } from 'react-router-dom'

import { UniButton } from '../../uniComponents/uniButton/UniButton'

import notFound from './../../../assets/images/404.png'
import s from './PageNotFound.module.css'

export const PageNotFound = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.pageBlock}>
      <div className={s.pageContainer}>
        <div className={s.infContainer}>
          <h1>Ooops!</h1>
          <h3>Sorry! Page not found!</h3>
          <UniButton className={'back'} title={'Back to home page'} onClick={onClickHandler} />
        </div>
        <div>
          <img src={notFound} alt="hello" className={s.img} />
        </div>
      </div>
    </div>
  )
}
