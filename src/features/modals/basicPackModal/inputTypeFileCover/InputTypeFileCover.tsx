import React, { ChangeEvent, useState } from 'react'

import { setAppErrorAC } from '../../../../app/app-reducer'
import noCover from '../../../../assets/images/noCover.jpg'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { deckCover } from '../../../../common/selectors/packs-selector'
import { convertFileToBase64 } from '../../../../common/utils/convertFileToBase64/convertFileToBase64'

import s from './InputTypeFileCover.module.css'

export const InputTypeFileCover = () => {
  const dispatch = useAppDispatch()

  const serverCover = useAppSelector(deckCover)

  const [cover, setCover] = useState(serverCover ? serverCover : noCover)
  const [isCoverBroken, setIsCoverBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCoverBroken(false)
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
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
      {/*<span className={s.changeCover}>Change cover</span>*/}
      <img
        className={s.cover}
        src={isCoverBroken ? noCover : cover}
        onError={errorHandler}
        alt="ava"
      />
    </>
  )
}
