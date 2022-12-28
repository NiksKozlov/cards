import React, { useEffect } from 'react'

import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { getPacksTC } from '../packsList/packs-reducer'

import s from './PacksFilterButtons.module.css'

export const PacksFilterButtons = () => {
  const dispatch = useAppDispatch()
  const packsFilter = useAppSelector(state => state.packs.packsFilter)
  const profileId = useAppSelector(state => state.profile._id)

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')

  const onMyClickHandler = () => {
    setSearchParams({ user_id: profileId })
  }

  const onAllClickHandler = () => {
    setSearchParams()
    dispatch(getPacksTC('All'))
  }

  useEffect(() => {
    if (userId) {
      dispatch(getPacksTC('My', userId))
    }
  }, [userId])

  return (
    <div className={s.container}>
      <h3>Show packs cards</h3>
      <ButtonGroup>
        <button
          onClick={onMyClickHandler}
          className={packsFilter === 'My' ? s.filterChosenBtn : s.filterDefaultBtn}
        >
          My
        </button>
        <button
          onClick={onAllClickHandler}
          className={packsFilter === 'All' ? s.filterChosenBtn : s.filterDefaultBtn}
        >
          All
        </button>
      </ButtonGroup>
    </div>
  )
}
