import React, { ChangeEvent, FC, useState } from 'react'

import { setAppErrorAC } from '../../../app/app-reducer'
import noCover from '../../../assets/images/noCover.jpg'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { convertFileToBase64 } from '../../utils/convertFileToBase64/convertFileToBase64'

import s from './InputTypeFileCover.module.css'

type PropsType = {
  cover: string
  setCover: (value: string) => void
}

export const InputTypeFileCover: FC<PropsType> = ({ cover, setCover }) => {
  const dispatch = useAppDispatch()

  const [isCoverBroken, setIsCoverBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setIsCoverBroken(false)
          setCover(file64)
        })
      } else {
        setAppErrorAC('File size too large 0_0')
      }
    }
  }

  const errorHandler = () => {
    setIsCoverBroken(true)
    dispatch(setAppErrorAC('Something is wrong with the uploaded image.'))
  }

  return (
    <>
      <div className={s.coverContainer}>
        <span className={s.changeWord}>Cover</span>
        <label>
          <input
            type="file"
            onChange={uploadHandler}
            accept={'image/*'}
            style={{ display: 'none' }}
          />
          <span className={s.changeCover}>Change Cover</span>
        </label>
      </div>
      <img
        className={s.cover}
        src={isCoverBroken ? noCover : cover}
        onError={errorHandler}
        alt="ava"
      />
    </>
  )
}
