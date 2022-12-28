import React, { ChangeEvent, useEffect } from 'react'

import { Slider, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import useDebounce from '../../../common/hooks/useDebounce'
import { getPacksTC, setMinMaxAC } from '../packsList/packs-reducer'

export const FilterSlider = () => {
  const dispatch = useAppDispatch()

  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)

  const [searchParams, setSearchParams] = useSearchParams()
  const urlAllParams = Object.fromEntries(searchParams)

  const minParam = searchParams.get('min')
  const maxParam = searchParams.get('max')

  /*const debouncedMin = useDebounce<number | undefined>(min, 700)
      const debouncedMax = useDebounce<number | undefined>(max, 700)*/
  const debouncedMin = useDebounce<string | null>(minParam, 700)
  const debouncedMax = useDebounce<string | null>(maxParam, 700)

  const handleMin = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setMinMaxAC(+event.target.value, undefined))
    setSearchParams({ ...urlAllParams, min: event.target.value })
  }

  const handleMax = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setMinMaxAC(undefined, +event.target.value))
    setSearchParams({ ...urlAllParams, max: event.target.value })
  }

  const handleSlider = (e: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setMinMaxAC(newValue[0], newValue[1]))
      setSearchParams({ ...urlAllParams, min: String(newValue[0]), max: String(newValue[1]) })
    }
  }

  useEffect(() => {
    /*setSearchParams({ ...urlAllParams, min: String(min), max: String(max) })*/
    if (minParam && maxParam) {
      dispatch(
        getPacksTC(undefined, undefined, undefined, undefined, undefined, +minParam, +maxParam)
      )
    } else {
      dispatch(getPacksTC())
    }
  }, [debouncedMin, debouncedMax])

  return (
    <div>
      {!!max && min !== undefined && (
        <>
          <TextField value={min} onChange={handleMin} sx={{ width: '70px', height: '30px' }} />
          <Slider
            /*getAriaLabel={() => 'Temperature range'}*/
            value={[min, max]}
            min={min}
            max={max}
            onChange={handleSlider}
            valueLabelDisplay="auto"
            sx={{ width: 200, marginX: '20px' }}
          />
          <TextField value={max} onChange={handleMax} sx={{ width: '70px', height: '30px' }} />
        </>
      )}
    </div>
  )
}
