import React from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/routePaths/routePaths.enum'
import { userProfile } from '../../../common/selectors/profile-selector'
import { setPackIdAC } from '../../cards/cardList/cards-reducer'
import { DeletePackModal } from '../../modals/basicDeleteModal/deletePackModal/DeletePackModal'
import { EditPackModal } from '../../modals/basicPackModal/editPackModal/EditPackModal'

import s from './Pack.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { StyledBodyTableCell, StyledBodyTableRow } from 'common/styles/tableStyleWrapper'

type PackPropsType = {
  id: string
  userId: string
  name: string
  cardsCount: number
  updated: Date
  created: string
  deckCover?: string
}

export const Pack = ({
  name,
  cardsCount,
  updated,
  created,
  id,
  userId,
  deckCover,
}: PackPropsType) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const profile = useAppSelector(userProfile)

  const date = updated.toString()
  const day = date.substr(8, 2)
  const month = date.substr(5, 2)
  const year = date.substr(0, 4)
  const updatedDate = `${day}.${month}.${year}`

  const onNameClickHandler = () => {
    dispatch(setPackIdAC(id))

    navigate(PATH.CARDS_LIST)
  }

  const runLearn = async () => {
    await dispatch(setPackIdAC(id))

    navigate(PATH.LEARN)
  }

  return (
    <StyledBodyTableRow>
      <StyledBodyTableCell align="left">
        <img className={s.cover} src={deckCover} alt="no cover" />
      </StyledBodyTableCell>
      <StyledBodyTableCell component="th" scope="row" onClick={onNameClickHandler}>
        {name}
      </StyledBodyTableCell>
      <StyledBodyTableCell align="left">{cardsCount}</StyledBodyTableCell>
      <StyledBodyTableCell align="left">{updatedDate}</StyledBodyTableCell>
      <StyledBodyTableCell align="left">{created}</StyledBodyTableCell>
      <StyledBodyTableCell align="left">
        <div className={s.iconButtons}>
          <IconButton disabled={!cardsCount} sx={{ color: 'black' }} onClick={runLearn}>
            <SchoolOutlinedIcon />
          </IconButton>
          {profile._id == userId && (
            <>
              <EditPackModal id={id} />
              <DeletePackModal id={id} name={name} />
            </>
          )}
        </div>
      </StyledBodyTableCell>
    </StyledBodyTableRow>
  )
}
