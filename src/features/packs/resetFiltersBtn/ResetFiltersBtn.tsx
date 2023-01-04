import React from 'react'

import { useSearchParams } from 'react-router-dom'

import resetFiltersIcon from '../../../../src/assets/images/remove-filters.svg'

import s from './ResetFiltersBtn.module.css'

export const ResetFiltersBtn = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleRequestReset = (e: React.MouseEvent<unknown>) => {
    setSearchParams()
  }

  return (
    <div className={s.resetFiltersButton}>
      <img alt={'reset all filters'} src={resetFiltersIcon} onClick={handleRequestReset} />
    </div>
  )
}
