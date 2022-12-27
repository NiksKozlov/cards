import React from 'react'

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { IconButton } from '@mui/material'

import { editPackTC } from '../../packsList/packs-reducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

type PropsType = {
  id: string
}

export type EditPackLocalStateType = {
  cardsPack: {
    _id: string
    name: string
  }
}

export const EditPack = (props: PropsType) => {
  const dispatch = useAppDispatch()

  const editPackLocalState = {
    cardsPack: {
      _id: props.id,
      name: 'Pack`s Name Edited',
    },
  }

  const editPackName = (editPackLocalState: EditPackLocalStateType) => {
    const thunk = editPackTC(editPackLocalState)

    dispatch(thunk)
  }

  return (
    <IconButton
      onClick={() => {
        editPackName(editPackLocalState)
      }}
    >
      <ModeOutlinedIcon />
    </IconButton>
  )
}
