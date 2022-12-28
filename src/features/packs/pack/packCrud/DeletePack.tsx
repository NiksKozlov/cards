import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import { deletePackTC } from '../../packsList/packs-reducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

type PropsType = {
  id: string
}

export const DeletePack = (props: PropsType) => {
  const dispatch = useAppDispatch()

  const deletePack = (id: string) => {
    const thunk = deletePackTC(id)

    dispatch(thunk)
  }

  return (
    <IconButton
      onClick={() => {
        deletePack(props.id)
      }}
    >
      <DeleteOutlinedIcon />
    </IconButton>
  )
}
