import React, { ChangeEvent, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, IconButton, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { loginValidationSchema } from '../../../common/utils/validationSchema/validationSchema'

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
              <TextField
                InputLabelProps={{ className: s.textFieldLabel }}
                inputProps={{ className: s.textFieldMain }}
                variant="standard"
                label="Email"
                margin="normal"
                name="email"
                onChange={handleInput}
                value={formik.values.email}
                error={!!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              <TextField
                InputLabelProps={{ className: s.textFieldLabel }}
                inputProps={{ className: s.textFieldMain }}
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                label="Password"
                margin="normal"
                name="password"
                onChange={handleInput}
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
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
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
              <button
                className={disabled ? s.disabledBtn : s.submitBtn}
                type={'submit'}
                color={'primary'}
                disabled={disabled}
              >
                Sign In
              </button>
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
