import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import { BasicDeleteModal } from '../BasicDeleteModal'

type PropsType = {
  id: string
  name: string
}

export const DeletePackModal = ({ id, name }: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicDeleteModal
      title={'Delete Pack'}
      comp={'delPack'}
      id={id}
      name={name}
      open={open}
      setOpen={setOpen}
    >
      <IconButton onClick={handleOpen}>
        <DeleteOutlinedIcon sx={{ color: 'black' }} />
      </IconButton>
    </BasicDeleteModal>
  )
}
