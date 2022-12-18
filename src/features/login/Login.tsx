import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, IconButton, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'

import { loginTC } from './auth-reducer'
import s from './Login.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 4 || values.password.length > 20) {
        errors.password = 'The password is too short'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <FormControl>
          <h1>Sign in</h1>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ width: '350px' }}>
              <TextField
                InputLabelProps={{ className: s.textFieldLabel }}
                inputProps={{ className: s.textFieldMain }}
                variant="standard"
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              <TextField
                InputLabelProps={{ className: s.textFieldLabel }}
                inputProps={{ className: s.textFieldMain }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                variant="standard"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <button className={s.submitBtn} type={'submit'} color={'primary'}>
                Sign In
              </button>
            </FormGroup>
          </form>
        </FormControl>
        <span className={s.span}>Already have an account?</span>
        <NavLink to={'/register'} className={s.signInBtn}>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}
