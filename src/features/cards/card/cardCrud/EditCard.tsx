import React from 'react'

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { IconButton } from '@mui/material'

import { editCardTC } from '../../cardList/cards-reducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

type PropsType = {
  _id: string
}

export type EditCardLocalStateType = {
  card: {
    _id: string
    question: string
  }
}

export const EditCard = (props: PropsType) => {
  const dispatch = useAppDispatch()

  const editCardLocalState = {
    card: {
      _id: props._id,
      question: 'Edited question',
    },
  }

  const editCardName = (editCardLocalState: EditCardLocalStateType) => {
    const thunk = editCardTC(editCardLocalState)

    dispatch(thunk)
  }

  return (
    <IconButton
      onClick={() => {
        editCardName(editCardLocalState)
      }}
    >
      <ModeOutlinedIcon />
    </IconButton>
  )
}
