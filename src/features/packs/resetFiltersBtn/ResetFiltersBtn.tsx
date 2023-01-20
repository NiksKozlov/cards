import React from 'react'

import { useSearchParams } from 'react-router-dom'

import resetFiltersIcon from '../../../../src/assets/images/remove-filters.svg'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import s from './ResetFiltersBtn.module.css'

export const ResetFiltersBtn = () => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const [searchParams, setSearchParams] = useSearchParams()

  const handleRequestReset = (e: React.MouseEvent<unknown>) => {
    setSearchParams()
  }

  return (
    <button className={s.resetFiltersButton} disabled={instruction} onClick={handleRequestReset}>
      {instruction ? (
        <img alt={'reset all filters'} src={resetFiltersIcon} style={{ opacity: '0.5' }} />
      ) : (
        <img alt={'reset all filters'} src={resetFiltersIcon} />
      )}
    </button>
  )
}
