import React, { ChangeEvent } from 'react'

import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import { UniInput } from '../../../common/uniComponents/uniInput/UniImput'
import { loginValidationSchema } from '../../../common/utils/validationSchema/validationSchema'

import { loginTC } from './auth-reducer'
import s from './Login.module.css'

export const Login = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      dispatch(loginTC(values))
    },
    validateOnChange: false,
  })

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    formik.handleChange(e)
    formik.setErrors({})
  }

  const disabled =
    formik.values.password.length === 0 ||
    formik.values.email.length === 0 ||
    !(formik.isValid && formik.dirty)

  if (isLoggedIn) {
    navigate(PATH.PACKS_LIST)
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <FormControl>
          <h1>Sign in</h1>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ width: '350px' }}>
              <UniInput
                label={'Email'}
                name={'email'}
                onChange={handleInput}
                value={formik.values.email}
                error={!!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={s.error}>{formik.errors.email}</div>
              )}
              <UniInput
                label={'Password'}
                name={'password'}
                onChange={handleInput}
                value={formik.values.password}
                error={!!formik.errors.password}
                eye={true}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={s.error}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                className={s.formControl}
                label={<span className={s.formControlLabel}>Remember Me</span>}
                control={
                  <Checkbox
                    name="rememberMe"
                    onChange={handleInput}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <NavLink to={PATH.FORGOT_PASSWORD} className={s.forgotPassword}>
                Forgot Password?
              </NavLink>
              <UniButton
                className={disabled ? 'disabledBtn' : 'submitBtn'}
                title={'Sign In'}
                type={'submit'}
                disabled={disabled}
              />
            </FormGroup>
          </form>
        </FormControl>
        <span className={s.span}>Already have an account?</span>
        <NavLink to={PATH.REGISTER} className={s.signInBtn}>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}
