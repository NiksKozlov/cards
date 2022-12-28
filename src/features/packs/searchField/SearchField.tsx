import React, { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import useDebounce from '../../../common/hooks/useDebounce'
import { getPacksTC } from '../packsList/packs-reducer'

import s from './SearchField.module.css'

const SearchField = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 700)

  const [searchParams, setSearchParams] = useSearchParams()
  const packName = searchParams.get('packName')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (packName) dispatch(getPacksTC(undefined, undefined, undefined, packName))
  }, [debouncedValue])

  useEffect(() => {
    if (value) setSearchParams({ packName: value })
  }, [value])

  return (
    <div className={s.searchContainer}>
      <h3>Search</h3>
      <TextField
        fullWidth
        label="search"
        value={value}
        onChange={handleChange}
        className={s.buttons}
      />
    </div>
  )
}

export default SearchField
