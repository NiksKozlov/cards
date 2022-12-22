import React from 'react'

import { FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { BadErrorSnackbar } from '../../../common/components/ErrorSnackbar/BadErrorSnackbar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { forgotPasswordValidationSchema } from '../../../common/utils/validationSchema/validationSchema'

import { forgotPassword, setForgotPasswordServerError } from './forgotPassword-reducer'
import s from './ForgotPassword.module.css'

type FormikErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()

  const isSent = useAppSelector(st => st.forgotPassword.isSent)
  const error = useAppSelector(st => st.forgotPassword.error)
  const serverError = useAppSelector(st => st.forgotPassword.serverError)
  const navigate = useNavigate()

  if (isSent) {
    navigate(PATH.CHECK_EMAIL)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: values => {
      dispatch(forgotPassword(values.email))
    },
  })

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <BadErrorSnackbar
          serverError={serverError}
          setServerErrorAction={setForgotPasswordServerError}
        />
        <h1>Forgot your password?</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ width: '350px' }}>
            <TextField
              InputLabelProps={{ className: s.textfieldLabel }}
              inputProps={{ className: s.textfieldMain }}
              variant="standard"
              label="Email"
              margin="normal"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={!!formik.errors.email}
            />
            {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
            {error ? <div className={s.error}>{error}</div> : null}
            <span className={s.instruction}>
              Enter your email address and we will send you further instructions?
            </span>
            <button className={s.submitBtn} type={'submit'} color={'primary'}>
              Send Instructions
            </button>
          </FormGroup>
        </form>
        <span>Do you remember your password?</span>
        <NavLink to={PATH.LOGIN} className={s.tryLoginBtn}>
          Try loggining in
        </NavLink>
      </div>
    </div>
  )
}
