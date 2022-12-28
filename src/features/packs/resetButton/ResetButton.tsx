import React from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import Button from '@mui/material/Button'

import s from './ResetButton.module.css'

export const ResetButton = () => {
  return (
    <div className={s.container}>
      <h3>Clear</h3>
      <Button className={s.button}>
        <FilterAltOffOutlinedIcon fontSize={'medium'} />
      </Button>
    </div>
  )
}
