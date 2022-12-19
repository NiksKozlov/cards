import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, IconButton, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { loginValidationSchema } from '../../common/utils/validationSchema/validationSchema'

import { loginTC } from './auth-reducer'
import s from './Login.module.css'

export const Login = () => {
  const navigate = useNavigate()
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
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  })

  if (isLoggedIn) {
    navigate('/')
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
                Sign Ip
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
