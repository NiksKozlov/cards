import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import useDebounce from '../../hooks/useDebounce'

import s from './SearchField.module.css'

type PropsType = {
  paramURL: string
  searchLabel: string
}

const SearchField: FC<PropsType> = ({ paramURL, searchLabel }) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 700)

  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const packNameSearch = e.currentTarget.value

    setValue(packNameSearch)

    if (!value) {
      searchParams.delete(paramURL)
      setSearchParams(searchParams)
    }
  }

  /*useEffect(() => {
    if (searchParams.get(paramURL)) {
      const pageNameSearch = String(searchParams.get(paramURL))

      setValue(pageNameSearch)
    }
  }, [])*/

  useEffect(() => {
    if (debouncedValue) {
      searchParams.set(paramURL, debouncedValue)
      setSearchParams(searchParams)
    }
    if (debouncedValue === '') {
      searchParams.delete(paramURL)
      setSearchParams(searchParams)
    }
  }, [searchParams, debouncedValue])

  return (
    <div className={s.searchContainer}>
      <h3>Search by {searchLabel}</h3>
      <TextField
        inputProps={{ className: s.textFieldMain }}
        value={value}
        onChange={onChangeHandler}
        className={s.buttons}
        placeholder="Provide your text"
      />
    </div>
  )
}

export default SearchField
