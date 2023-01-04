import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'

import s from './UniInput.module.css'

type PropsType = {
  name?: string
  error?: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  value: string
  label: string
  eye?: boolean
}

export const UniInput = ({ onChange, value, label, name, error, eye }: PropsType) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const typeEye = showPassword ? 'text' : 'password'

  return (
    <TextField
      inputProps={{ className: s.input }}
      InputLabelProps={{ className: s.inputLabel }}
      type={eye ? typeEye : 'text'}
      variant="standard"
      label={label}
      margin="normal"
      onChange={onChange}
      value={value}
      name={name}
      error={error}
      InputProps={
        eye
          ? {
              endAdornment: (
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }
          : undefined
      }
    />
  )
}
