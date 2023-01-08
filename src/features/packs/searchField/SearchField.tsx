import React, { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import useDebounce from '../../../common/hooks/useDebounce'

import s from './SearchField.module.css'

const SearchField = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 700)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (debouncedValue) {
      searchParams.set('packName', debouncedValue)
      setSearchParams(searchParams)
    }
    /*if (searchParams.get('packName')) {
      setValue(String(searchParams.get('packName')))
    }*/
    if (value.length === 0) {
      searchParams.delete('packName')
      setSearchParams(searchParams)
    }
  }, [searchParams, debouncedValue])

  return (
    <div className={s.searchContainer}>
      <h3>Search by Pack Name</h3>
      <TextField
        inputProps={{ className: s.textFieldMain }}
        value={value}
        onChange={handleChange}
        className={s.buttons}
        placeholder="Provide your text"
      />
    </div>
  )
}

export default SearchField
