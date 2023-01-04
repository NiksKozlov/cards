import React, { ChangeEvent, useState } from 'react'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { IconButton } from '@mui/material'

import { setAppErrorAC } from '../../../../app/app-reducer'
import defaultAva from '../../../../assets/images/defaultAva.jpg'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { userAva } from '../../../../common/selectors/profile-selector'
import { convertFileToBase64 } from '../../../../common/utils/convertFileToBase64/convertFileToBase64'
import { changeProfileAvatarTC } from '../profile-reducer'

import s from './InputTypeFileAva.module.css'

export const InputTypeFileAva = () => {
  const dispatch = useAppDispatch()

  const avatar = useAppSelector(userAva)

  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(changeProfileAvatarTC(file64))
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
        className={s.ava}
        src={isAvaBroken ? defaultAva : avatar}
        onError={errorHandler}
        alt="ava"
      />
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton component="span">
          <AddAPhotoIcon sx={{ color: 'grey' }} fontSize={'large'} />
        </IconButton>
      </label>
    </div>
  )
}
