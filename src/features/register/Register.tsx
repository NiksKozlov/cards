import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormGroup, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { BadErrorSnackbar } from '../../common/components/ErrorSnackbar/BadErrorSnackbar'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { registration, setRegisterServerError } from './register-reducer'
import s from './Register.module.css'

type FormikErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const Register = () => {
  const dispatch = useAppDispatch()

  const isRegistered = useAppSelector(st => st.register.isRegistered)
  const error = useAppSelector(st => st.register.error)
  const serverError = useAppSelector(st => st.register.serverError)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show)
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  if (isRegistered) {
    return <Navigate to={'/login'} />
  }

  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorsType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less'
      } else if (values.password.length < 5) {
        errors.password = 'Must be at least 5 characters'
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      } else if (values.confirmPassword.length > 20) {
        errors.confirmPassword = 'Must be 20 characters or less'
      } else if (values.confirmPassword.length < 5) {
        errors.confirmPassword = 'Must be at least 5 characters'
      }

      if (values.password !== values.confirmPassword) {
        errors.password = 'Passwords do not match'
        errors.confirmPassword = 'Passwords do not match'
      }

      return errors
    },
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      dispatch(registration(values.email, values.password))
    },
  })

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <BadErrorSnackbar serverError={serverError} setServerErrorAction={setRegisterServerError} />
        <h1>Sign Up</h1>
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
            <TextField
              InputLabelProps={{ className: s.textfieldLabel }}
              inputProps={{ className: s.textfieldMain }}
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              label="Password"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={!!formik.errors.password}
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
            />
            {formik.errors.password ? (
              <div className={s.error}>{formik.errors.password}</div>
            ) : null}
            <TextField
              InputLabelProps={{ className: s.textfieldLabel }}
              inputProps={{ className: s.textfieldMain }}
              type={showConfirmPassword ? 'text' : 'password'}
              variant="standard"
              label="Confirm Password"
              margin="normal"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={!!formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {formik.errors.confirmPassword ? (
              <div className={s.error}>{formik.errors.confirmPassword}</div>
            ) : null}
            {error ? <div className={s.error}>{error}</div> : null}
            <button className={s.submitBtn} type={'submit'} color={'primary'}>
              Sign Up
            </button>
          </FormGroup>
        </form>
        <span>Already have an account?</span>
        <NavLink to={'/login'} className={s.signInBtn}>
          Sign In
        </NavLink>
      </div>
    </div>
  )
}
