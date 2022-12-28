import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import { deleteCardTC } from '../../cardList/cards-reducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

type PropsType = {
  _id: string
}

export const DeleteCard = (props: PropsType) => {
  const dispatch = useAppDispatch()

  const deleteCard = (_id: string) => {
    const thunk = deleteCardTC(_id)

    dispatch(thunk)
  }

  return (
    <IconButton
      onClick={() => {
        deleteCard(props._id)
      }}
    >
      <DeleteOutlinedIcon />
    </IconButton>
  )
}
