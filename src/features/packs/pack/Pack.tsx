import React from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { setPackIdAC } from '../../cards/cardList/cards-reducer'

import { DeletePack } from './packCrud/DeletePack'
import { EditPack } from './packCrud/EditPack'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { StyledBodyTableCell, StyledBodyTableRow } from 'common/styles/tableStyleWrapper'

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
  const profile = useAppSelector(state => state.profile)

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
      <StyledBodyTableCell align="left">{cardsCount}</StyledBodyTableCell>
      <StyledBodyTableCell align="left">{updatedDate}</StyledBodyTableCell>
      <StyledBodyTableCell align="left">{created}</StyledBodyTableCell>
      <StyledBodyTableCell align="left">
        <IconButton disabled={!cardsCount} sx={{ color: 'black' }}>
          <SchoolOutlinedIcon />
        </IconButton>
        {profile.name == created && (
          <>
            <EditPack id={id} />
            <DeletePack id={id} />
          </>
        )}
      </StyledBodyTableCell>
    </StyledBodyTableRow>
  )
}
