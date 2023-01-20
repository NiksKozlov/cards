import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { BasicDeleteModal } from '../BasicDeleteModal'

type PropsType = {
  id: string
}

export const DeleteCardModal = ({ id }: PropsType) => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicDeleteModal title={'Delete Card'} comp={'delCard'} id={id} open={open} setOpen={setOpen}>
      <IconButton onClick={handleOpen}>
        {instruction ? (
          <DeleteOutlinedIcon sx={{ color: '#bdbdbd' }} />
        ) : (
          <DeleteOutlinedIcon sx={{ color: 'black' }} />
        )}
      </IconButton>
    </BasicDeleteModal>
  )
}
