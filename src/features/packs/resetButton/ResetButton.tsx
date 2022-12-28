import React from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import Button from '@mui/material/Button'

import s from './ResetButton.module.css'

export const ResetButton = () => {
  return (
    <Button className={s.button}>
      <FilterAltOffOutlinedIcon fontSize={'medium'} />
    </Button>
  )
}
