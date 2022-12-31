import * as React from 'react'
import { ChangeEvent } from 'react'

import { TextField } from '@mui/material'

import s from './UniInput.module.css'

type PropsType = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  value: string
  label: string
}

export const UniInput = ({ onChange, value, label }: PropsType) => {
  return (
    <TextField
      inputProps={{ className: s.input }}
      InputLabelProps={{ className: s.inputLabel }}
      variant="standard"
      label={label}
      margin="normal"
      onChange={onChange}
      value={value}
    />
  )
}
