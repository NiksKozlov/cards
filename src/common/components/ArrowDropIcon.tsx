import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

type PropsType = {
  sortParam: string
  ascending: '1name' | '1cardsCount' | '1updated'
}

export const ArrowDropIcon = ({ sortParam, ascending }: PropsType) => {
  return sortParam === ascending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
}
