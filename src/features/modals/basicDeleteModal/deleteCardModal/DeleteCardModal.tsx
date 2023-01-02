import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import { BasicDeleteModal } from '../BasicDeleteModal'

type PropsType = {
  id: string
}

export const DeleteCardModal = ({ id }: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicDeleteModal title={'Delete Card'} comp={'delCard'} id={id} open={open} setOpen={setOpen}>
      <IconButton onClick={handleOpen}>
        <DeleteOutlinedIcon />
      </IconButton>
    </BasicDeleteModal>
  )
}
