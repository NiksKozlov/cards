import React, { useState } from 'react'

import { ButtonGroup } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { userID } from '../../profile/user-selector'

import s from './PacksFilterButtons.module.css'

export const PacksFilterButtons = () => {
  const dispatch = useAppDispatch()

  const [belonging, setBelonging] = useState('all')
  const userId = useAppSelector(userID)

  const [searchParams, setSearchParams] = useSearchParams()

  const onMyClickHandler = () => {
    searchParams.set('belonging', 'my')
    setSearchParams(searchParams)
    setBelonging('my')
  }

  const onAllClickHandler = () => {
    searchParams.set('belonging', 'all')
    setSearchParams(searchParams)
    setBelonging('all')
  }

  return (
    <div className={s.container}>
      <h3>Show packs cards</h3>
      <div>
        <button
          onClick={onMyClickHandler}
          className={belonging === 'my' ? s.filterChosenBtn : s.filterDefaultBtn}
        >
          My
        </button>
        <button
          onClick={onAllClickHandler}
          className={belonging === 'all' ? s.filterChosenBtn : s.filterDefaultBtn}
        >
          All
        </button>
      </div>
    </div>
  )
}
