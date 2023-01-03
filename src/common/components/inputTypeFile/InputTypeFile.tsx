import React, { ChangeEvent, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'

import { setAppErrorAC } from '../../../app/app-reducer'
import defaultAva from '../../../assets/images/defaultAva.png'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { convertFileToBase64 } from '../../utils/convertFileToBase64/convertFileToBase64'

export const InputTypeFile = () => {
  const dispatch = useAppDispatch()

  const [ava, setAva] = useState(defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          // dispatch(updateProfileTC({ avatar: file64 }))
          // setAva(file64)
          // setAva('111')
        })
      } else {
        setAppErrorAC('File size too large 0_0')
      }
    }
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    dispatch(setAppErrorAC('Something is wrong with the uploaded image.'))
  }

  return (
    <div>
      <img
        src={isAvaBroken ? defaultAva : ava}
        style={{ width: '100px' }}
        onError={errorHandler}
        alt="ava"
      />
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
    </div>
  )
}
