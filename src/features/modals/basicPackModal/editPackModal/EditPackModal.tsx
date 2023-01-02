import React from 'react'

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { IconButton } from '@mui/material'

import { BasicPackModal } from '../BasicPackModal'

type PropsType = {
  id: string
}

export const EditPackModal = ({ id }: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicPackModal title={'Edit pack'} open={open} setOpen={setOpen} id={id} comp={'edit'}>
      <IconButton onClick={handleOpen}>
        <ModeOutlinedIcon />
      </IconButton>
    </BasicPackModal>
  )
}
