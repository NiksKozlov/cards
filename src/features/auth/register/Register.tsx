import React, { ChangeEvent } from 'react'

import { FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { BadErrorSnackbar } from '../../../common/components/errorSnackbar/BadErrorSnackbar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import { UniInput } from '../../../common/uniComponents/uniInput/UniImput'
import { registrationValidationSchema } from '../../../common/utils/validationSchema/validationSchema'

import { registration, setRegisterServerError } from './register-reducer'
import s from './Register.module.css'

export const Register = () => {
  const dispatch = useAppDispatch()

  const isRegistered = useAppSelector(st => st.register.isRegistered)
  const error = useAppSelector(st => st.register.error)
  const serverError = useAppSelector(st => st.register.serverError)
  const navigate = useNavigate()

  if (isRegistered) {
    navigate(PATH.LOGIN)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationValidationSchema,
    onSubmit: values => {
      dispatch(registration(values.email, values.password))
    },
    validateOnChange: false,
  })

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    formik.handleChange(e)
    formik.setErrors({})
  }

  const disabled =
    formik.values.password.length === 0 ||
    formik.values.confirmPassword.length === 0 ||
    formik.values.email.length === 0 ||
    !(formik.isValid && formik.dirty)

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <BadErrorSnackbar serverError={serverError} setServerErrorAction={setRegisterServerError} />
        <h1>Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ width: '350px' }}>
            <UniInput
              label={'Email'}
              name={'email'}
              onChange={handleInput}
              value={formik.values.email}
              error={!!formik.errors.email}
            />
            {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
            <UniInput
              label={'Password'}
              name={'password'}
              onChange={handleInput}
              value={formik.values.password}
              error={!!formik.errors.password}
              eye={true}
            />
            {formik.errors.password ? (
              <div className={s.error}>{formik.errors.password}</div>
            ) : null}
            <UniInput
              label={'Confirm Password'}
              name={'confirmPassword'}
              onChange={handleInput}
              value={formik.values.confirmPassword}
              error={!!formik.errors.confirmPassword}
              eye={true}
            />
            {formik.errors.confirmPassword ? (
              <div className={s.error}>{formik.errors.confirmPassword}</div>
            ) : null}
            {error ? <div className={s.error}>{error}</div> : null}
            <UniButton
              className={disabled ? 'disabledBtn' : 'submitBtn'}
              title={'Sign Up'}
              type={'submit'}
              disabled={disabled}
            />
          </FormGroup>
        </form>
        <span>Already have an account?</span>
        <NavLink to={PATH.LOGIN} className={s.signInBtn}>
          Sign In
        </NavLink>
      </div>
    </div>
  )
}
