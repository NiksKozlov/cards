import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { myAllFilter } from '../../../common/selectors/packs-selector'
import { userID } from '../../../common/selectors/profile-selector'

import s from './PacksFilterButtons.module.css'

export const PacksFilterButtons = () => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const userId = useAppSelector(userID)
  const filter = useAppSelector(myAllFilter)

  const [searchParams, setSearchParams] = useSearchParams()

  const onMyClickHandler = () => {
    searchParams.set('user_id', userId)
    searchParams.delete('page')
    setSearchParams(searchParams)
  }

  const onAllClickHandler = () => {
    searchParams.delete('user_id')
    setSearchParams(searchParams)
  }

  let classAllBtn = s.filterDefaultBtn
  let classMyBtn = s.filterDefaultBtn

  if (filter === 'all') {
    if (instruction) {
      classAllBtn = s.disableChosenBtn
      classMyBtn = s.disableDefaultBtn
    } else {
      classAllBtn = s.filterChosenBtn
      classMyBtn = s.filterDefaultBtn
    }
  } else if (filter === 'my') {
    if (instruction) {
      classAllBtn = s.disableDefaultBtn
      classMyBtn = s.disableChosenBtn
    } else {
      classAllBtn = s.filterDefaultBtn
      classMyBtn = s.filterChosenBtn
    }
  }

  return (
    <div className={s.container}>
      <h3>Show packs cards</h3>
      <div>
        <button onClick={onMyClickHandler} className={classMyBtn} disabled={instruction}>
          My
        </button>
        <button onClick={onAllClickHandler} className={classAllBtn} disabled={instruction}>
          All
        </button>
      </div>
    </div>
  )
}
