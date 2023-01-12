import React, { ChangeEvent } from 'react'

import { FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { BadErrorSnackbar } from '../../../common/components/errorSnackbar/BadErrorSnackbar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/routePaths/routePaths.enum'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import { UniInput } from '../../../common/uniComponents/uniInput/UniImput'
import { newPasswordValidationSchema } from '../../../common/utils/validationSchema/validationSchema'

import { createNewPassword, setNewPasswordServerError } from './newPassword-reducer'
import s from './NewPassword.module.css'

export const NewPassword = () => {
  const dispatch = useAppDispatch()

  const { token } = useParams<{ token: string }>()

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
    validateOnChange: false,
  })

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    formik.handleChange(e)
    formik.setErrors({})
  }

  const disabled = formik.values.password.length === 0 || !(formik.isValid && formik.dirty)

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
            {error ? <div className={s.error}>{error}</div> : null}
            <span className={s.instruction}>
              Create new password and we will send you further instructions to email
            </span>
            <UniButton
              className={disabled ? 'disabledBtn' : 'submitBtn'}
              title={'Create new password'}
              type={'submit'}
              disabled={disabled}
            />
          </FormGroup>
        </form>
      </div>
    </div>
  )
}
