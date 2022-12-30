import React, { ChangeEvent, useEffect, useState } from 'react'

import { Slider, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import useDebounce from '../../../common/hooks/useDebounce'
import { getPacksTC, setMinMaxAC } from '../packsList/packs-reducer'
import { maxCardsCount, minCardsCount } from '../packsList/packs-selector'

export const FilterSlider = () => {
  const minValue = useAppSelector(minCardsCount)
  const maxValue = useAppSelector(maxCardsCount)
  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const onChangeCommittedHandler = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    const value = newValue as number[]

    searchParams.set('min', String(value[0]))
    searchParams.set('max', String(value[1]))
    searchParams.set('page', String(1))
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (searchParams.get('min') || searchParams.get('max')) {
      const minSearch = Number(searchParams.get('min'))
      const maxSearch = Number(searchParams.get('max'))

      setValue([minSearch, maxSearch])
    } else {
      setValue([minValue, maxValue])
    }
  }, [searchParams, minValue, maxValue])

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
