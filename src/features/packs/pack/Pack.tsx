import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Icon, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { StyledBodyTableCell, StyledBodyTableRow } from '../../../common/styles/tableStyleWrapper'
import { getCardsTC, setPackIdAC } from '../../cards/cardList/cards-reducer'

type PackPropsType = {
  id: string
  name: string
  cardsCount: number
  updated: Date
  created: string
}

export const Pack = ({ name, cardsCount, updated, created, id }: PackPropsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const date = updated.toString()
  const day = date.substr(8, 2)
  const month = date.substr(5, 2)
  const year = date.substr(0, 4)
  const updatedDate = `${day}.${month}.${year}`

  const onNameClickHandler = async () => {
    await dispatch(setPackIdAC(id))

    navigate('/cards-list')
  }

  return (
    <StyledBodyTableRow>
      <StyledBodyTableCell component="th" scope="row" onClick={onNameClickHandler}>
        {name}
      </StyledBodyTableCell>
      <StyledBodyTableCell align="right">{cardsCount}</StyledBodyTableCell>
      <StyledBodyTableCell align="right">{updatedDate}</StyledBodyTableCell>
      <StyledBodyTableCell align="right">{created}</StyledBodyTableCell>
      <StyledBodyTableCell align="right">
        <IconButton disabled={cardsCount ? false : true} sx={{ color: 'black' }}>
          <SchoolOutlinedIcon />
        </IconButton>
        <IconButton>
          <ModeOutlinedIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlinedIcon />
        </IconButton>
      </StyledBodyTableCell>
    </StyledBodyTableRow>
  )
}
