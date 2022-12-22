import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormGroup, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { BadErrorSnackbar } from '../../../common/components/ErrorSnackbar/BadErrorSnackbar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { newPasswordValidationSchema } from '../../../common/utils/validationSchema/validationSchema'

import { createNewPassword, setNewPasswordServerError } from './newPassword-reducer'
import s from './NewPassword.module.css'

type FormikErrorsType = {
  password?: string
}

export const NewPassword = () => {
  const dispatch = useAppDispatch()

  const { token } = useParams<{ token: string }>()

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const isCreateNewPassword = useAppSelector(st => st.newPassword.isCreateNewPassword)
  const error = useAppSelector(st => st.newPassword.error)
  const serverError = useAppSelector(st => st.newPassword.serverError)
  const navigate = useNavigate()

  if (isCreateNewPassword) {
    navigate(PATH.LOGIN)
  }

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: newPasswordValidationSchema,
    onSubmit: values => {
      dispatch(createNewPassword(values.password, token as string))
    },
  })

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <BadErrorSnackbar
          serverError={serverError}
          setServerErrorAction={setNewPasswordServerError}
        />
        <h1>Create new password</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ width: '350px' }}>
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
            {error ? <div className={s.error}>{error}</div> : null}
            <span className={s.instruction}>
              Create new password and we will send you futherinstructions to email
            </span>
            <button className={s.submitBtn} type={'submit'} color={'primary'}>
              Create new password
            </button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}
