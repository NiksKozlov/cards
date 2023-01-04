import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/routePaths/routePaths.enum'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'

import s from './CheckEmail.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <h1>Check Email</h1>
        <img style={{ width: '130px', height: '130px', backgroundColor: 'palegoldenrod' }} alt="" />
        <span
          className={s.instruction}
        >{`We've sent an Email with instructions to example@mail.com`}</span>
        <UniButton className={'submitBackToLoginBtn'} title={'Back to login'} type={'submit'} />
      </div>
    </div>
  )
}
