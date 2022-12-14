import React from 'react'

import { FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'

export const Register = () => {
  const formik = useFormik({
    validate: values => {},
    initialValues: {},
    onSubmit: values => {},
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField label="Email" />
        <TextField label="Password" />
        <TextField label="Confirm password" />
      </FormGroup>
    </form>
  )
}
