import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { showMyAll } from '../../../common/selectors/packs-selector'
import { userID } from '../../../common/selectors/user-selector'

import s from './PacksFilterButtons.module.css'

export const PacksFilterButtons = () => {
  const userId = useAppSelector(userID)
  const filter = useAppSelector(showMyAll)

  const [searchParams, setSearchParams] = useSearchParams()

  const onMyClickHandler = () => {
    searchParams.set('user_id', userId)
    setSearchParams(searchParams)
  }

  const onAllClickHandler = () => {
    searchParams.delete('user_id')
    setSearchParams(searchParams)
  }

  return (
    <div className={s.container}>
      <h3>Show packs cards</h3>
      <div>
        <button
          onClick={onMyClickHandler}
          className={filter === 'my' ? s.filterChosenBtn : s.filterDefaultBtn}
        >
          My
        </button>
        <button
          onClick={onAllClickHandler}
          className={filter === 'all' ? s.filterChosenBtn : s.filterDefaultBtn}
        >
          All
        </button>
      </div>
    </div>
  )
}
